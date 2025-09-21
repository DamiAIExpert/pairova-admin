// src/lib/services/auth.service.ts
// Authentication API services for admin dashboard

import { apiClient } from '../api';

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
    isVerified: boolean;
  };
  token: string;
}

export interface AdminProfile {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
  phone?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export class AdminAuthService {
  // Authentication endpoints
  static async login(credentials: AdminLoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    
    // Store token after successful login
    if (response.data.token) {
      apiClient.setToken(response.data.token);
    }
    
    return response.data;
  }

  static async logout(): Promise<void> {
    // Clear token from client
    apiClient.setToken(null);
    
    // Optionally call logout endpoint if it exists
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Ignore errors on logout
      console.warn('Logout endpoint failed:', error);
    }
  }

  static async getCurrentUser(): Promise<AdminProfile> {
    const response = await apiClient.get<AdminProfile>('/auth/profile');
    return response.data;
  }

  static async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  }

  static async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  }

  static async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiClient.post('/auth/verify-email', { token });
    return response.data;
  }

  static async resendVerificationEmail(): Promise<{ message: string }> {
    const response = await apiClient.post('/auth/resend-verification');
    return response.data;
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!apiClient['token'];
  }

  // Get stored token
  static getToken(): string | null {
    return apiClient['token'];
  }

  // Check if user has admin role
  static isAdmin(): boolean {
    // This would typically check the user's role from the stored user data
    // For now, we'll assume if they have a token, they're an admin
    return this.isAuthenticated();
  }
}

