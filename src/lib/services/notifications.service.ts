// src/lib/services/notifications.service.ts
// Notifications API services

import { apiClient, PaginationParams } from '../api';

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  priority: NotificationPriority;
  category: NotificationCategory;
  actionUrl?: string;
  actionText?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationRequest {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  priority?: NotificationPriority;
  category?: NotificationCategory;
  actionUrl?: string;
  actionText?: string;
  expiresAt?: string;
}

export interface UpdateNotificationRequest {
  isRead?: boolean;
  priority?: NotificationPriority;
  actionUrl?: string;
  actionText?: string;
}

export interface NotificationPreferences {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  categories: {
    [key in NotificationCategory]: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
    timezone: string;
  };
  frequency: NotificationFrequency;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateNotificationPreferencesRequest {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  smsNotifications?: boolean;
  categories?: {
    [key in NotificationCategory]?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
  };
  quietHours?: {
    enabled?: boolean;
    startTime?: string;
    endTime?: string;
    timezone?: string;
  };
  frequency?: NotificationFrequency;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byCategory: {
    [key in NotificationCategory]: {
      total: number;
      unread: number;
    };
  };
  byPriority: {
    [key in NotificationPriority]: {
      total: number;
      unread: number;
    };
  };
}

// Enums
export enum NotificationType {
  APPLICATION_SUBMITTED = 'APPLICATION_SUBMITTED',
  APPLICATION_REVIEWED = 'APPLICATION_REVIEWED',
  APPLICATION_ACCEPTED = 'APPLICATION_ACCEPTED',
  APPLICATION_REJECTED = 'APPLICATION_REJECTED',
  INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
  INTERVIEW_REMINDER = 'INTERVIEW_REMINDER',
  INTERVIEW_CANCELLED = 'INTERVIEW_CANCELLED',
  JOB_POSTED = 'JOB_POSTED',
  JOB_MATCHED = 'JOB_MATCHED',
  JOB_SAVED = 'JOB_SAVED',
  JOB_REMINDER = 'JOB_REMINDER',
  PROFILE_VERIFIED = 'PROFILE_VERIFIED',
  PROFILE_INCOMPLETE = 'PROFILE_INCOMPLETE',
  MESSAGE_RECEIVED = 'MESSAGE_RECEIVED',
  SYSTEM_UPDATE = 'SYSTEM_UPDATE',
  SECURITY_ALERT = 'SECURITY_ALERT',
  WELCOME = 'WELCOME',
  REMINDER = 'REMINDER',
  DEADLINE_APPROACHING = 'DEADLINE_APPROACHING',
  DEADLINE_PASSED = 'DEADLINE_PASSED',
}

export enum NotificationPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum NotificationCategory {
  APPLICATIONS = 'APPLICATIONS',
  JOBS = 'JOBS',
  INTERVIEWS = 'INTERVIEWS',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE',
  SYSTEM = 'SYSTEM',
  SECURITY = 'SECURITY',
  REMINDERS = 'REMINDERS',
}

export enum NotificationFrequency {
  IMMEDIATE = 'IMMEDIATE',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  NEVER = 'NEVER',
}

export class NotificationsService {
  // Notification endpoints
  static async getNotifications(params: PaginationParams & {
    category?: NotificationCategory;
    priority?: NotificationPriority;
    isRead?: boolean;
    type?: NotificationType;
  } = {}): Promise<{
    notifications: Notification[];
    total: number;
    page: number;
    limit: number;
  }> {
    const response = await apiClient.get('/notifications', params);
    return response.data;
  }

  static async getNotification(notificationId: string): Promise<Notification> {
    const response = await apiClient.get<Notification>(`/notifications/${notificationId}`);
    return response.data;
  }

  static async markAsRead(notificationId: string): Promise<Notification> {
    const response = await apiClient.patch<Notification>(`/notifications/${notificationId}/read`);
    return response.data;
  }

  static async markAsUnread(notificationId: string): Promise<Notification> {
    const response = await apiClient.patch<Notification>(`/notifications/${notificationId}/unread`);
    return response.data;
  }

  static async markAllAsRead(): Promise<{ count: number }> {
    const response = await apiClient.patch<{ count: number }>('/notifications/read-all');
    return response.data;
  }

  static async deleteNotification(notificationId: string): Promise<void> {
    await apiClient.delete(`/notifications/${notificationId}`);
  }

  static async deleteAllNotifications(): Promise<{ count: number }> {
    const response = await apiClient.delete<{ count: number }>('/notifications');
    return response.data;
  }

  static async getNotificationStats(): Promise<NotificationStats> {
    const response = await apiClient.get<NotificationStats>('/notifications/stats');
    return response.data;
  }

  // Notification preferences endpoints
  static async getNotificationPreferences(): Promise<NotificationPreferences> {
    const response = await apiClient.get<NotificationPreferences>('/notifications/preferences');
    return response.data;
  }

  static async updateNotificationPreferences(data: UpdateNotificationPreferencesRequest): Promise<NotificationPreferences> {
    const response = await apiClient.put<NotificationPreferences>('/notifications/preferences', data);
    return response.data;
  }

  static async resetNotificationPreferences(): Promise<NotificationPreferences> {
    const response = await apiClient.post<NotificationPreferences>('/notifications/preferences/reset');
    return response.data;
  }

  // Admin notification endpoints (for creating notifications)
  static async createNotification(data: CreateNotificationRequest): Promise<Notification> {
    const response = await apiClient.post<Notification>('/notifications', data);
    return response.data;
  }

  static async updateNotification(notificationId: string, data: UpdateNotificationRequest): Promise<Notification> {
    const response = await apiClient.put<Notification>(`/notifications/${notificationId}`, data);
    return response.data;
  }

  static async sendBulkNotification(data: {
    userIds: string[];
    type: NotificationType;
    title: string;
    message: string;
    data?: Record<string, any>;
    priority?: NotificationPriority;
    category?: NotificationCategory;
    actionUrl?: string;
    actionText?: string;
  }): Promise<{ count: number; notificationIds: string[] }> {
    const response = await apiClient.post<{ count: number; notificationIds: string[] }>('/notifications/bulk', data);
    return response.data;
  }

  // Real-time notification endpoints
  static async subscribeToNotifications(): Promise<{ subscriptionId: string }> {
    const response = await apiClient.post<{ subscriptionId: string }>('/notifications/subscribe');
    return response.data;
  }

  static async unsubscribeFromNotifications(subscriptionId: string): Promise<void> {
    await apiClient.delete(`/notifications/subscribe/${subscriptionId}`);
  }

  // Notification templates (for admin use)
  static async getNotificationTemplates(): Promise<{
    templates: Array<{
      id: string;
      type: NotificationType;
      title: string;
      message: string;
      variables: string[];
      isActive: boolean;
    }>;
  }> {
    const response = await apiClient.get('/notifications/templates');
    return response.data;
  }

  static async updateNotificationTemplate(templateId: string, data: {
    title?: string;
    message?: string;
    isActive?: boolean;
  }): Promise<any> {
    const response = await apiClient.put(`/notifications/templates/${templateId}`, data);
    return response.data;
  }
}
