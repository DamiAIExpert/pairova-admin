import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';
import { useApi } from './useApi';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: {
    id: string;
    email: string;
    role: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      orgName?: string;
    };
  };
  type: 'TEXT' | 'FILE' | 'IMAGE' | 'SYSTEM';
  content?: string;
  attachment?: {
    id: string;
    filename: string;
    url: string;
    size: number;
    mimeType: string;
  };
  replyTo?: {
    id: string;
    content: string;
    sender: {
      firstName?: string;
      lastName?: string;
      orgName?: string;
    };
  };
  status: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';
  sentAt: string;
  isDeleted: boolean;
}

interface Conversation {
  id: string;
  type: 'DIRECT' | 'JOB_RELATED' | 'INTERVIEW' | 'SUPPORT';
  status: 'ACTIVE' | 'ARCHIVED' | 'BLOCKED' | 'DELETED';
  title?: string;
  description?: string;
  job?: {
    id: string;
    title: string;
    orgName: string;
  };
  participants: Array<{
    id: string;
    email: string;
    role: string;
    joinedAt: string;
    lastSeenAt?: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      orgName?: string;
      photoUrl?: string;
    };
  }>;
  lastMessage?: Message;
  lastMessageAt?: string;
  unreadCount: number;
  createdAt: string;
}

interface SendMessageDto {
  conversationId: string;
  content?: string;
  type?: 'TEXT' | 'FILE' | 'IMAGE' | 'SYSTEM';
  attachmentId?: string;
  replyToId?: string;
  metadata?: {
    isUrgent?: boolean;
    requiresResponse?: boolean;
    expiresAt?: Date;
  };
}

interface CreateConversationDto {
  type: 'DIRECT' | 'JOB_RELATED' | 'INTERVIEW' | 'SUPPORT';
  title?: string;
  description?: string;
  jobId?: string;
  participantIds: string[];
  applicationId?: string;
  interviewId?: string;
  metadata?: {
    tags?: string[];
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
    category?: string;
  };
}

interface ChatHookReturn {
  // Connection state
  isConnected: boolean;
  socket: Socket | null;
  
  // Data
  conversations: Conversation[] | null;
  messages: Message[] | null;
  onlineUsers: Set<string>;
  typingUsers: Set<string>;
  
  // Loading states
  loading: boolean;
  sending: boolean;
  
  // Actions
  sendMessage: (message: SendMessageDto) => Promise<void>;
  createConversation: (conversation: CreateConversationDto) => Promise<Conversation>;
  joinConversation: (conversationId: string) => void;
  leaveConversation: (conversationId: string) => void;
  markMessagesAsRead: (messageIds: string[]) => Promise<void>;
  updateMessageStatus: (messageId: string, status: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED') => Promise<void>;
  
  // File sharing
  shareFile: (conversationId: string, fileId: string, message?: string) => Promise<void>;
  
  // Typing indicators
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
  
  // Online status
  getOnlineStatus: (userIds: string[]) => Promise<Array<{ userId: string; isOnline: boolean; lastSeen: Date }>>;
  
  // Error handling
  error: string | null;
  clearError: () => void;
}

export function useChat(): ChatHookReturn {
  const { user, token } = useAuth();
  const api = useApi();
  
  // State
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [conversations, setConversations] = useState<Conversation[] | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const currentConversationId = useRef<string | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize socket connection
  useEffect(() => {
    if (!user || !token) return;

    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      auth: {
        token,
      },
      transports: ['websocket'],
      upgrade: true,
    });

    // Connection events
    newSocket.on('connect', () => {
      console.log('Connected to chat server');
      setIsConnected(true);
      setError(null);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected from chat server:', reason);
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Chat connection error:', error);
      setError('Failed to connect to chat server');
    });

    // Message events
    newSocket.on('newMessage', (message: Message) => {
      setMessages(prev => {
        if (!prev) return [message];
        
        // Check if message already exists (prevent duplicates)
        const exists = prev.some(m => m.id === message.id);
        if (exists) return prev;
        
        return [...prev, message].sort((a, b) => 
          new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
        );
      });

      // Update conversation's last message
      setConversations(prev => {
        if (!prev) return null;
        
        return prev.map(conv => 
          conv.id === message.conversationId 
            ? { 
                ...conv, 
                lastMessage: message, 
                lastMessageAt: message.sentAt,
                unreadCount: conv.id === currentConversationId.current 
                  ? conv.unreadCount 
                  : conv.unreadCount + 1
              }
            : conv
        );
      });
    });

    newSocket.on('messagesRead', (data: { conversationId: string; userId: string; messageIds: string[] }) => {
      setMessages(prev => {
        if (!prev) return null;
        
        return prev.map(message => 
          data.messageIds.includes(message.id) && message.senderId !== data.userId
            ? { ...message, status: 'READ' }
            : message
        );
      });
    });

    newSocket.on('messageStatusUpdate', (data: { messageId: string; userId: string; status: string }) => {
      setMessages(prev => {
        if (!prev) return null;
        
        return prev.map(message => 
          message.id === data.messageId && message.senderId !== data.userId
            ? { ...message, status: data.status as any }
            : message
        );
      });
    });

    // Conversation events
    newSocket.on('conversationCreated', (conversation: Conversation) => {
      setConversations(prev => {
        if (!prev) return [conversation];
        
        // Check if conversation already exists
        const exists = prev.some(c => c.id === conversation.id);
        if (exists) return prev;
        
        return [conversation, ...prev];
      });
    });

    // Typing events
    newSocket.on('userTyping', (data: { userId: string; conversationId: string; isTyping: boolean }) => {
      if (data.conversationId !== currentConversationId.current) return;
      
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        if (data.isTyping) {
          newSet.add(data.userId);
        } else {
          newSet.delete(data.userId);
        }
        return newSet;
      });
    });

    newSocket.on('stopTyping', (data: { userId: string; conversationId: string }) => {
      if (data.conversationId !== currentConversationId.current) return;
      
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(data.userId);
        return newSet;
      });
    });

    // Online status events
    newSocket.on('contactStatusChange', (data: { userId: string; isOnline: boolean }) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        if (data.isOnline) {
          newSet.add(data.userId);
        } else {
          newSet.delete(data.userId);
        }
        return newSet;
      });
    });

    newSocket.on('onlineStatuses', (statuses: Array<{ userId: string; isOnline: boolean; lastSeen: Date }>) => {
      const onlineSet = new Set(statuses.filter(s => s.isOnline).map(s => s.userId));
      setOnlineUsers(onlineSet);
    });

    // Error events
    newSocket.on('error', (error: { message: string; details?: string }) => {
      console.error('Chat error:', error);
      setError(error.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user, token]);

  // Load conversations
  useEffect(() => {
    if (!isConnected || !user) return;

    const loadConversations = async () => {
      try {
        setLoading(true);
        const response = await api.get('/chat/conversations');
        setConversations(response.data.conversations);
      } catch (error) {
        console.error('Failed to load conversations:', error);
        setError('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [isConnected, user, api]);

  // Actions
  const sendMessage = useCallback(async (messageDto: SendMessageDto) => {
    if (!socket || !isConnected) {
      throw new Error('Not connected to chat server');
    }

    try {
      setSending(true);
      socket.emit('sendMessage', messageDto);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    } finally {
      setSending(false);
    }
  }, [socket, isConnected]);

  const createConversation = useCallback(async (conversationDto: CreateConversationDto): Promise<Conversation> => {
    if (!socket || !isConnected) {
      throw new Error('Not connected to chat server');
    }

    try {
      setLoading(true);
      socket.emit('createConversation', conversationDto);
      
      // Wait for conversationCreated event
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Timeout waiting for conversation creation'));
        }, 5000);

        const handleConversationCreated = (conversation: Conversation) => {
          clearTimeout(timeout);
          socket.off('conversationCreated', handleConversationCreated);
          resolve(conversation);
        };

        socket.on('conversationCreated', handleConversationCreated);
      });
    } catch (error) {
      console.error('Failed to create conversation:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [socket, isConnected]);

  const joinConversation = useCallback((conversationId: string) => {
    if (!socket || !isConnected) return;

    socket.emit('joinConversation', { conversationId });
    currentConversationId.current = conversationId;

    // Load messages for this conversation
    const loadMessages = async () => {
      try {
        const response = await api.get(`/chat/conversations/${conversationId}/messages`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    loadMessages();
  }, [socket, isConnected, api]);

  const leaveConversation = useCallback((conversationId: string) => {
    if (!socket || !isConnected) return;

    socket.emit('leaveConversation', { conversationId });
    
    if (currentConversationId.current === conversationId) {
      currentConversationId.current = null;
      setMessages(null);
    }
  }, [socket, isConnected]);

  const markMessagesAsRead = useCallback(async (messageIds: string[]) => {
    if (!socket || !isConnected) return;

    try {
      await api.put('/chat/messages/read', { messageIds });
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  }, [socket, isConnected, api]);

  const updateMessageStatus = useCallback(async (messageId: string, status: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED') => {
    if (!socket || !isConnected) return;

    try {
      socket.emit('updateMessageStatus', { messageId, status });
    } catch (error) {
      console.error('Failed to update message status:', error);
    }
  }, [socket, isConnected]);

  const shareFile = useCallback(async (conversationId: string, fileId: string, message?: string) => {
    if (!socket || !isConnected) {
      throw new Error('Not connected to chat server');
    }

    try {
      setSending(true);
      socket.emit('shareFile', { conversationId, fileId, message });
    } catch (error) {
      console.error('Failed to share file:', error);
      throw error;
    } finally {
      setSending(false);
    }
  }, [socket, isConnected]);

  const startTyping = useCallback((conversationId: string) => {
    if (!socket || !isConnected) return;

    socket.emit('typing', { conversationId, isTyping: true });
  }, [socket, isConnected]);

  const stopTyping = useCallback((conversationId: string) => {
    if (!socket || !isConnected) return;

    socket.emit('typing', { conversationId, isTyping: false });
  }, [socket, isConnected]);

  const getOnlineStatus = useCallback(async (userIds: string[]) => {
    if (!socket || !isConnected) {
      throw new Error('Not connected to chat server');
    }

    return new Promise<Array<{ userId: string; isOnline: boolean; lastSeen: Date }>>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout waiting for online status'));
      }, 3000);

      const handleOnlineStatuses = (statuses: Array<{ userId: string; isOnline: boolean; lastSeen: Date }>) => {
        clearTimeout(timeout);
        socket.off('onlineStatuses', handleOnlineStatuses);
        resolve(statuses);
      };

      socket.on('onlineStatuses', handleOnlineStatuses);
      socket.emit('getOnlineStatus', { userIds });
    });
  }, [socket, isConnected]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Connection state
    isConnected,
    socket,
    
    // Data
    conversations,
    messages,
    onlineUsers,
    typingUsers,
    
    // Loading states
    loading,
    sending,
    
    // Actions
    sendMessage,
    createConversation,
    joinConversation,
    leaveConversation,
    markMessagesAsRead,
    updateMessageStatus,
    
    // File sharing
    shareFile,
    
    // Typing indicators
    startTyping,
    stopTyping,
    
    // Online status
    getOnlineStatus,
    
    // Error handling
    error,
    clearError,
  };
}

