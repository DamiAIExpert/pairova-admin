// src/lib/services/admin.service.ts
// Admin dashboard API services

import { apiClient, PaginationParams } from '../api';

// Types for admin dashboard
export interface DashboardStats {
  totalUsers: number;
  totalApplicants: number;
  totalNonprofits: number;
  totalJobs: number;
  totalApplications: number;
  activeJobs: number;
  verifiedUsers: number;
  applicationsThisMonth: number;
  newUsersThisMonth: number;
  hiringRate: number;
  averageApplicationsPerJob: number;
}

export interface PerformanceMetrics {
  userRegistrations: Array<{ date: string; value: number }>;
  jobPostings: Array<{ date: string; value: number }>;
  applications: Array<{ date: string; value: number }>;
  successfulMatches: Array<{ date: string; value: number }>;
  period: string;
}

export interface ActivityItem {
  id: string;
  type: 'USER_REGISTERED' | 'JOB_POSTED' | 'APPLICATION_SUBMITTED' | 'USER_VERIFIED' | 'JOB_PUBLISHED';
  description: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  entityId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ActivityFeed {
  activities: ActivityItem[];
  total: number;
}

export interface Recommendation {
  id: string;
  type: 'HIGH_MATCH_SCORE' | 'PENDING_REVIEW' | 'ACTIVE_APPLICANTS' | 'JOB_RECOMMENDATION';
  title: string;
  description: string;
  priority: number;
  entityIds?: string[];
  actionUrl?: string;
  createdAt: string;
}

export interface Recommendations {
  recommendations: Recommendation[];
  highPriorityCount: number;
}

export class AdminService {
  // Dashboard endpoints
  static async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/admin/dashboard-stats');
    return response.data;
  }

  static async getPerformanceMetrics(period: string = '30d'): Promise<PerformanceMetrics> {
    const response = await apiClient.get<PerformanceMetrics>('/admin/dashboard/performance', { period });
    return response.data;
  }

  static async getActivityFeed(limit: number = 10): Promise<ActivityFeed> {
    const response = await apiClient.get<ActivityFeed>('/admin/dashboard/activity', { limit });
    return response.data;
  }

  static async getRecommendations(): Promise<Recommendations> {
    const response = await apiClient.get<Recommendations>('/admin/dashboard/recommendations');
    return response.data;
  }

  // User management endpoints
  static async getUsers(params: PaginationParams & { role?: string; search?: string } = {}) {
    const response = await apiClient.get('/admin/users', params);
    return response.data;
  }

  static async getUser(userId: string) {
    const response = await apiClient.get(`/admin/users/${userId}`);
    return response.data;
  }

  static async updateUser(userId: string, data: { isVerified?: boolean; role?: string; phone?: string }) {
    const response = await apiClient.put(`/admin/users/${userId}`, data);
    return response.data;
  }

  static async deleteUser(userId: string) {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return response.data;
  }

  static async getUserApplications(userId: string, params: PaginationParams = {}) {
    const response = await apiClient.get(`/admin/users/${userId}/applications`, params);
    return response.data;
  }

  // Job seekers management
  static async getJobSeekers(params: PaginationParams & { search?: string } = {}) {
    const response = await apiClient.get('/admin/job-seekers', params);
    return response.data;
  }

  static async getJobSeeker(seekerId: string) {
    const response = await apiClient.get(`/admin/job-seekers/${seekerId}`);
    return response.data;
  }

  static async updateJobSeeker(seekerId: string, data: any) {
    const response = await apiClient.put(`/admin/job-seekers/${seekerId}`, data);
    return response.data;
  }

  static async deleteJobSeeker(seekerId: string) {
    const response = await apiClient.delete(`/admin/job-seekers/${seekerId}`);
    return response.data;
  }

  static async getJobSeekerAppliedJobs(seekerId: string, params: PaginationParams = {}) {
    const response = await apiClient.get(`/admin/job-seekers/${seekerId}/applied`, params);
    return response.data;
  }

  static async getJobSeekerEducation(seekerId: string) {
    const response = await apiClient.get(`/admin/job-seekers/${seekerId}/education`);
    return response.data;
  }

  static async getJobSeekerExperience(seekerId: string) {
    const response = await apiClient.get(`/admin/job-seekers/${seekerId}/experience`);
    return response.data;
  }

  static async getJobSeekerCertifications(seekerId: string) {
    const response = await apiClient.get(`/admin/job-seekers/${seekerId}/certifications`);
    return response.data;
  }

  // NGO management
  static async getNgos(params: PaginationParams & { search?: string } = {}) {
    const response = await apiClient.get('/admin/ngos', params);
    return response.data;
  }

  static async getNgo(ngoId: string) {
    const response = await apiClient.get(`/admin/ngos/${ngoId}`);
    return response.data;
  }

  static async updateNgo(ngoId: string, data: any) {
    const response = await apiClient.put(`/admin/ngos/${ngoId}`, data);
    return response.data;
  }

  static async deleteNgo(ngoId: string) {
    const response = await apiClient.delete(`/admin/ngos/${ngoId}`);
    return response.data;
  }

  static async getNgoJobs(ngoId: string, params: PaginationParams = {}) {
    const response = await apiClient.get(`/admin/ngos/${ngoId}/jobs`, params);
    return response.data;
  }

  static async getNgoJobApplicants(ngoId: string, jobId: string, params: PaginationParams = {}) {
    const response = await apiClient.get(`/admin/ngos/${ngoId}/jobs/${jobId}/applicants`, params);
    return response.data;
  }

  static async getNgoStatistics(ngoId: string) {
    const response = await apiClient.get(`/admin/ngos/${ngoId}/statistics`);
    return response.data;
  }

  // Application management
  static async getApplications(params: PaginationParams & { 
    status?: string; 
    jobId?: string; 
    applicantId?: string; 
    ngoId?: string; 
    search?: string; 
  } = {}) {
    const response = await apiClient.get('/admin/applications', params);
    return response.data;
  }

  static async getApplication(applicationId: string) {
    const response = await apiClient.get(`/admin/applications/${applicationId}`);
    return response.data;
  }

  static async updateApplicationStatus(applicationId: string, data: { status: string; notes?: string }) {
    const response = await apiClient.put(`/admin/applications/${applicationId}/status`, data);
    return response.data;
  }

  static async getApplicationPipeline(ngoId?: string) {
    const response = await apiClient.get('/admin/applications/pipeline', ngoId ? { ngoId } : {});
    return response.data;
  }

  static async getApplicationStatistics(ngoId?: string) {
    const response = await apiClient.get('/admin/applications/statistics', ngoId ? { ngoId } : {});
    return response.data;
  }

  // Feedback management
  static async getFeedback(params: PaginationParams & { 
    status?: string; 
    priority?: string; 
    category?: string; 
    search?: string; 
  } = {}) {
    const response = await apiClient.get('/admin/feedback', params);
    return response.data;
  }

  static async getFeedbackItem(feedbackId: string) {
    const response = await apiClient.get(`/admin/feedback/${feedbackId}`);
    return response.data;
  }

  static async updateFeedback(feedbackId: string, data: { 
    status?: string; 
    priority?: string; 
    adminNotes?: string; 
    assignedToId?: string; 
  }) {
    const response = await apiClient.put(`/admin/feedback/${feedbackId}`, data);
    return response.data;
  }

  static async deleteFeedback(feedbackId: string) {
    const response = await apiClient.delete(`/admin/feedback/${feedbackId}`);
    return response.data;
  }

  static async getFeedbackStatistics() {
    const response = await apiClient.get('/admin/feedback/statistics');
    return response.data;
  }

  // Audit logs
  static async getAuditLogs(params: PaginationParams = {}) {
    const response = await apiClient.get('/admin/audit/logs', params);
    return response.data;
  }

  // Settings
  static async getEmailSettings() {
    const response = await apiClient.get('/admin/settings/email');
    return response.data;
  }

  static async updateEmailSettings(data: any) {
    const response = await apiClient.put('/admin/settings/email', data);
    return response.data;
  }

  static async getSmsSettings() {
    const response = await apiClient.get('/admin/settings/sms');
    return response.data;
  }

  static async updateSmsSettings(data: any) {
    const response = await apiClient.put('/admin/settings/sms', data);
    return response.data;
  }

  // SMS Provider Management
  static async getSmsProviders() {
    const response = await apiClient.get('/admin/sms/providers');
    return response.data;
  }

  static async getSmsProvider(id: string) {
    const response = await apiClient.get(`/admin/sms/providers/${id}`);
    return response.data;
  }

  static async createSmsProvider(provider: any) {
    const response = await apiClient.post('/admin/sms/providers', provider);
    return response.data;
  }

  static async updateSmsProvider(id: string, provider: any) {
    const response = await apiClient.put(`/admin/sms/providers/${id}`, provider);
    return response.data;
  }

  static async deleteSmsProvider(id: string) {
    await apiClient.delete(`/admin/sms/providers/${id}`);
  }

  static async toggleSmsProviderStatus(id: string, isActive: boolean) {
    const response = await apiClient.put(`/admin/sms/providers/${id}/toggle`, { isActive });
    return response.data;
  }

  static async updateSmsProviderPriority(id: string, priority: number) {
    const response = await apiClient.put(`/admin/sms/providers/${id}/priority`, { priority });
    return response.data;
  }

  static async performSmsProviderHealthCheck(id: string) {
    await apiClient.post(`/admin/sms/providers/${id}/health-check`);
  }

  static async performSmsHealthCheckAll() {
    await apiClient.post('/admin/sms/providers/health-check-all');
  }

  static async getSmsLogs(page: number = 1, limit: number = 50, filters?: any) {
    const response = await apiClient.get('/admin/sms/logs', {
      params: { page, limit, ...filters }
    });
    return response.data;
  }

  static async getSmsStatistics() {
    const response = await apiClient.get('/admin/sms/statistics');
    return response.data;
  }

  static async sendTestSms(data: { recipient: string; message?: string; providerId?: string }) {
    const response = await apiClient.post('/admin/sms/test', data);
    return response.data;
  }

  // CMS Pages
  static async getPage(slug: string) {
    const response = await apiClient.get(`/admin/pages/${slug}`);
    return response.data;
  }

  static async updatePage(slug: string, data: any) {
    const response = await apiClient.put(`/admin/pages/${slug}`, data);
    return response.data;
  }

  // Storage Management Methods
  static async getStorageProviders() {
    const response = await apiClient.get('/admin/storage/providers');
    return response.data;
  }

  static async getStorageProvider(id: string) {
    const response = await apiClient.get(`/admin/storage/providers/${id}`);
    return response.data;
  }

  static async createStorageProvider(data: any) {
    const response = await apiClient.post('/admin/storage/providers', data);
    return response.data;
  }

  static async updateStorageProvider(id: string, data: any) {
    const response = await apiClient.put(`/admin/storage/providers/${id}`, data);
    return response.data;
  }

  static async deleteStorageProvider(id: string) {
    const response = await apiClient.delete(`/admin/storage/providers/${id}`);
    return response.data;
  }

  static async testStorageProviderConnection(id: string) {
    const response = await apiClient.post(`/admin/storage/providers/${id}/test`);
    return response.data;
  }

  static async performStorageHealthCheck(id?: string) {
    const url = id 
      ? `/admin/storage/providers/${id}/health-check`
      : '/admin/storage/providers/health-check-all';
    const response = await apiClient.post(url);
    return response.data;
  }

  static async getStorageStats() {
    const response = await apiClient.get('/admin/storage/usage');
    return response.data;
  }

  static async getSupportedStorageTypes() {
    const response = await apiClient.get('/admin/storage/supported-types');
    return response.data;
  }

  static async activateStorageProvider(id: string) {
    const response = await apiClient.put(`/admin/storage/providers/${id}/activate`);
    return response.data;
  }

  static async deactivateStorageProvider(id: string) {
    const response = await apiClient.put(`/admin/storage/providers/${id}/deactivate`);
    return response.data;
  }

  static async updateStorageProviderPriority(id: string, priority: number) {
    const response = await apiClient.put(`/admin/storage/providers/${id}/priority`, { priority });
    return response.data;
  }
}

