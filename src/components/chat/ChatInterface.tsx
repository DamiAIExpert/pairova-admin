'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical, 
  Search, 
  Archive, 
  Users,
  FileText,
  Image,
  Download,
  Reply,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  Smile,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/hooks/useAuth';
import { useChat } from '@/lib/hooks/useChat';

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

interface ChatInterfaceProps {
  conversationId?: string;
  onConversationSelect?: (conversation: Conversation) => void;
  className?: string;
}

export default function ChatInterface({ 
  conversationId, 
  onConversationSelect,
  className 
}: ChatInterfaceProps) {
  const { user } = useAuth();
  const { 
    conversations, 
    messages, 
    sendMessage, 
    joinConversation, 
    leaveConversation,
    isConnected,
    onlineUsers 
  } = useChat();

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-select conversation if provided
  useEffect(() => {
    if (conversationId && conversations) {
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        setSelectedConversation(conversation);
        joinConversation(conversationId);
      }
    }
  }, [conversationId, conversations, joinConversation]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleConversationSelect = (conversation: Conversation) => {
    if (selectedConversation?.id === conversation.id) return;

    // Leave previous conversation
    if (selectedConversation) {
      leaveConversation(selectedConversation.id);
    }

    setSelectedConversation(conversation);
    joinConversation(conversation.id);
    onConversationSelect?.(conversation);
  };

  const handleSendMessage = async () => {
    if (!selectedConversation || (!messageText.trim() && !selectedFile)) return;

    try {
      if (selectedFile) {
        // Handle file upload
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        // Upload file first, then send message with file ID
        // This would typically be handled by your file upload service
        console.log('File upload not implemented yet');
        return;
      }

      await sendMessage({
        conversationId: selectedConversation.id,
        content: messageText,
        replyToId: replyTo?.id,
      });

      setMessageText('');
      setReplyTo(null);
      setSelectedFile(null);
      setShowFileUpload(false);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleTyping = () => {
    if (!selectedConversation) return;

    setIsTyping(true);
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowFileUpload(true);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'SENT':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'DELIVERED':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'READ':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      case 'FAILED':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getConversationTitle = (conversation: Conversation) => {
    if (conversation.title) return conversation.title;
    
    if (conversation.type === 'JOB_RELATED' && conversation.job) {
      return `Job: ${conversation.job.title}`;
    }

    const otherParticipants = conversation.participants.filter(p => p.id !== user?.id);
    if (otherParticipants.length === 1) {
      const participant = otherParticipants[0];
      return participant.profile?.firstName 
        ? `${participant.profile.firstName} ${participant.profile.lastName}`
        : participant.profile?.orgName || participant.email;
    }

    return `Group Chat (${conversation.participants.length})`;
  };

  const getParticipantName = (participant: Conversation['participants'][0]) => {
    if (participant.profile?.firstName) {
      return `${participant.profile.firstName} ${participant.profile.lastName}`;
    }
    if (participant.profile?.orgName) {
      return participant.profile.orgName;
    }
    return participant.email;
  };

  const isUserOnline = (participantId: string) => {
    return onlineUsers?.has(participantId) || false;
  };

  const filteredConversations = conversations?.filter(conversation => {
    if (!searchQuery) return true;
    
    const title = getConversationTitle(conversation).toLowerCase();
    const lastMessage = conversation.lastMessage?.content?.toLowerCase() || '';
    
    return title.includes(searchQuery.toLowerCase()) || 
           lastMessage.includes(searchQuery.toLowerCase());
  }) || [];

  return (
    <div className={cn("flex h-[600px] bg-white rounded-lg border", className)}>
      {/* Conversations Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div className="flex items-center gap-2">
              <Badge variant={isConnected ? "default" : "secondary"}>
                {isConnected ? "Online" : "Offline"}
              </Badge>
              <Button size="sm" variant="ghost">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-colors",
                  selectedConversation?.id === conversation.id
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50"
                )}
                onClick={() => handleConversationSelect(conversation)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage 
                        src={conversation.participants.find(p => p.id !== user?.id)?.profile?.photoUrl} 
                      />
                      <AvatarFallback>
                        {getConversationTitle(conversation).charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.type === 'JOB_RELATED' && (
                      <Badge className="absolute -bottom-1 -right-1 text-xs px-1 py-0">
                        Job
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">
                        {getConversationTitle(conversation)}
                      </h3>
                      <div className="flex items-center gap-1">
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs px-1 py-0">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-400">
                          {conversation.lastMessageAt && formatMessageTime(conversation.lastMessageAt)}
                        </span>
                      </div>
                    </div>
                    
                    {conversation.lastMessage && (
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {conversation.lastMessage.type === 'FILE' && (
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {conversation.lastMessage.attachment?.filename || 'File'}
                          </span>
                        )}
                        {conversation.lastMessage.type === 'TEXT' && conversation.lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage 
                      src={selectedConversation.participants.find(p => p.id !== user?.id)?.profile?.photoUrl} 
                    />
                    <AvatarFallback>
                      {getConversationTitle(selectedConversation).charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">
                      {getConversationTitle(selectedConversation)}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-3 h-3" />
                      <span>{selectedConversation.participants.length} participants</span>
                      {selectedConversation.type === 'JOB_RELATED' && selectedConversation.job && (
                        <>
                          <span>•</span>
                          <span>{selectedConversation.job.orgName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Archive className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages?.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.senderId === user?.id ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.senderId !== user?.id && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.sender.profile?.photoUrl} />
                        <AvatarFallback>
                          {message.sender.profile?.firstName?.charAt(0) || 
                           message.sender.profile?.orgName?.charAt(0) || 
                           message.sender.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={cn(
                        "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                        message.senderId === user?.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      )}
                    >
                      {message.replyTo && (
                        <div className={cn(
                          "mb-2 p-2 rounded border-l-2 text-xs",
                          message.senderId === user?.id 
                            ? "bg-blue-400 border-blue-300" 
                            : "bg-gray-50 border-gray-300"
                        )}>
                          <div className="font-medium">
                            {message.replyTo.sender.firstName 
                              ? `${message.replyTo.sender.firstName} ${message.replyTo.sender.lastName}`
                              : message.replyTo.sender.orgName}
                          </div>
                          <div className="truncate">{message.replyTo.content}</div>
                        </div>
                      )}
                      
                      {message.type === 'TEXT' && (
                        <p className="text-sm">{message.content}</p>
                      )}
                      
                      {message.type === 'FILE' && message.attachment && (
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{message.attachment.filename}</span>
                          <Button size="sm" variant="ghost" className="p-1 h-auto">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">
                          {formatMessageTime(message.sentAt)}
                        </span>
                        {message.senderId === user?.id && (
                          <div className="flex items-center">
                            {getMessageStatusIcon(message.status)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {message.senderId === user?.id && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.profile?.photoUrl} />
                        <AvatarFallback>
                          {user?.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicators */}
                {typingUsers.size > 0 && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>...</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-xs text-gray-500 ml-2">typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              {replyTo && (
                <div className="mb-3 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Reply className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Replying to {replyTo.sender.profile?.firstName || replyTo.sender.profile?.orgName}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setReplyTo(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <div className="flex items-end gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                
                <div className="flex-1">
                  <Textarea
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => {
                      setMessageText(e.target.value);
                      handleTyping();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[40px] max-h-32 resize-none"
                    rows={1}
                  />
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim() && !selectedFile}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
              <p className="text-sm">Choose a conversation from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
