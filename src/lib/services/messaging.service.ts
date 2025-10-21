// src/lib/services/messaging.service.ts
// Messaging and chat API services

import { apiClient, PaginationParams } from '../api';

// Chat Types
export interface Conversation {
  id: string;
  type: ConversationType;
  title: string;
  participants: Participant[];
  lastMessage?: Message;
  unreadCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: MessageType;
  status: MessageStatus;
  replyToId?: string;
  attachments?: Attachment[];
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  sender: {
    id: string;
    firstName?: string;
    lastName?: string;
    orgName?: string;
    photoUrl?: string;
  };
}

export interface Participant {
  id: string;
  userId: string;
  conversationId: string;
  role: ParticipantRole;
  joinedAt: string;
  lastReadAt?: string;
  isActive: boolean;
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    orgName?: string;
    photoUrl?: string;
  };
}

export interface Attachment {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}

export interface CreateConversationRequest {
  type: ConversationType;
  title?: string;
  participantIds: string[];
  initialMessage?: string;
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  messageType?: MessageType;
  replyToId?: string;
  attachments?: File[];
}

export interface UpdateConversationRequest {
  title?: string;
  isActive?: boolean;
}

export interface ConversationSearchParams extends PaginationParams {
  type?: ConversationType;
  search?: string;
  isActive?: boolean;
}

export interface MessageSearchParams extends PaginationParams {
  conversationId?: string;
  search?: string;
  messageType?: MessageType;
  status?: MessageStatus;
}

// Interview Types
export interface Interview {
  id: string;
  applicationId: string;
  scheduledBy: string;
  scheduledFor: string;
  duration: number; // in minutes
  type: InterviewType;
  status: InterviewStatus;
  location?: string;
  meetingUrl?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  application: {
    id: string;
    job: {
      id: string;
      title: string;
      nonprofit: {
        orgName: string;
      };
    };
    applicant: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export interface ScheduleInterviewRequest {
  applicationId: string;
  scheduledFor: string;
  duration: number;
  type: InterviewType;
  location?: string;
  meetingUrl?: string;
  notes?: string;
}

export interface UpdateInterviewRequest {
  scheduledFor?: string;
  duration?: number;
  type?: InterviewType;
  status?: InterviewStatus;
  location?: string;
  meetingUrl?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
}

// Enums
export enum ConversationType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
  JOB_APPLICATION = 'JOB_APPLICATION',
  INTERVIEW = 'INTERVIEW',
  SUPPORT = 'SUPPORT',
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
  SYSTEM = 'SYSTEM',
  INTERVIEW_INVITE = 'INTERVIEW_INVITE',
  APPLICATION_UPDATE = 'APPLICATION_UPDATE',
}

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}

export enum ParticipantRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  OBSERVER = 'OBSERVER',
}

export enum InterviewType {
  PHONE = 'PHONE',
  VIDEO = 'VIDEO',
  IN_PERSON = 'IN_PERSON',
  ASSESSMENT = 'ASSESSMENT',
}

export enum InterviewStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED',
}

export class MessagingService {
  // Conversation endpoints
  static async getConversations(params: ConversationSearchParams = {}): Promise<{
    conversations: Conversation[];
    total: number;
    page: number;
    limit: number;
  }> {
    const response = await apiClient.get('/conversations', params);
    return response.data;
  }

  static async getConversation(conversationId: string): Promise<Conversation> {
    const response = await apiClient.get<Conversation>(`/conversations/${conversationId}`);
    return response.data;
  }

  static async createConversation(data: CreateConversationRequest): Promise<Conversation> {
    const response = await apiClient.post<Conversation>('/conversations', data);
    return response.data;
  }

  static async updateConversation(conversationId: string, data: UpdateConversationRequest): Promise<Conversation> {
    const response = await apiClient.put<Conversation>(`/conversations/${conversationId}`, data);
    return response.data;
  }

  static async deleteConversation(conversationId: string): Promise<void> {
    await apiClient.delete(`/conversations/${conversationId}`);
  }

  static async addParticipant(conversationId: string, userId: string): Promise<Participant> {
    const response = await apiClient.post<Participant>(`/conversations/${conversationId}/participants`, {
      userId,
    });
    return response.data;
  }

  static async removeParticipant(conversationId: string, userId: string): Promise<void> {
    await apiClient.delete(`/conversations/${conversationId}/participants/${userId}`);
  }

  // Message endpoints
  static async getMessages(conversationId: string, params: MessageSearchParams = {}): Promise<{
    messages: Message[];
    total: number;
    page: number;
    limit: number;
  }> {
    const response = await apiClient.get(`/conversations/${conversationId}/messages`, params);
    return response.data;
  }

  static async sendMessage(data: SendMessageRequest): Promise<Message> {
    const formData = new FormData();
    formData.append('conversationId', data.conversationId);
    formData.append('content', data.content);
    formData.append('messageType', data.messageType || MessageType.TEXT);
    
    if (data.replyToId) {
      formData.append('replyToId', data.replyToId);
    }
    
    if (data.attachments) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachments`, file);
      });
    }

    const response = await apiClient.post<Message>('/messages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async getMessage(messageId: string): Promise<Message> {
    const response = await apiClient.get<Message>(`/messages/${messageId}`);
    return response.data;
  }

  static async updateMessageStatus(messageId: string, status: MessageStatus): Promise<Message> {
    const response = await apiClient.patch<Message>(`/messages/${messageId}/status`, { status });
    return response.data;
  }

  static async markMessagesAsRead(conversationId: string): Promise<void> {
    await apiClient.patch(`/conversations/${conversationId}/read`);
  }

  static async deleteMessage(messageId: string): Promise<void> {
    await apiClient.delete(`/messages/${messageId}`);
  }

  // Interview endpoints
  static async getInterviews(params: PaginationParams & { status?: InterviewStatus } = {}): Promise<{
    interviews: Interview[];
    total: number;
    page: number;
    limit: number;
  }> {
    const response = await apiClient.get('/interviews', params);
    return response.data;
  }

  static async getInterview(interviewId: string): Promise<Interview> {
    const response = await apiClient.get<Interview>(`/interviews/${interviewId}`);
    return response.data;
  }

  static async scheduleInterview(data: ScheduleInterviewRequest): Promise<Interview> {
    const response = await apiClient.post<Interview>('/interviews', data);
    return response.data;
  }

  static async updateInterview(interviewId: string, data: UpdateInterviewRequest): Promise<Interview> {
    const response = await apiClient.put<Interview>(`/interviews/${interviewId}`, data);
    return response.data;
  }

  static async cancelInterview(interviewId: string, reason?: string): Promise<Interview> {
    const response = await apiClient.patch<Interview>(`/interviews/${interviewId}/cancel`, { reason });
    return response.data;
  }

  static async rescheduleInterview(interviewId: string, newDateTime: string): Promise<Interview> {
    const response = await apiClient.patch<Interview>(`/interviews/${interviewId}/reschedule`, {
      scheduledFor: newDateTime,
    });
    return response.data;
  }

  static async completeInterview(interviewId: string, feedback: string, rating?: number): Promise<Interview> {
    const response = await apiClient.patch<Interview>(`/interviews/${interviewId}/complete`, {
      feedback,
      rating,
    });
    return response.data;
  }

  // Search endpoints
  static async searchConversations(query: string, params: PaginationParams = {}): Promise<{
    conversations: Conversation[];
    total: number;
    page: number;
    limit: number;
  }> {
    const response = await apiClient.get('/conversations/search', { ...params, q: query });
    return response.data;
  }

  static async searchMessages(query: string, params: MessageSearchParams = {}): Promise<{
    messages: Message[];
    total: number;
    page: number;
    limit: number;
  }> {
    const response = await apiClient.get('/messages/search', { ...params, q: query });
    return response.data;
  }
}
