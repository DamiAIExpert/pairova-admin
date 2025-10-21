// src/lib/services/index.ts
// Export all API services

export { AuthService, type AuthResponse, type LoginRequest, type RegisterRequest, type UserProfile, Role } from './auth.service';
export { AdminService, type DashboardStats, type PerformanceMetrics, type ActivityFeed, type Recommendations } from './admin.service';
export { JobsService, type Job, type CreateJobRequest, type JobSearchParams, type JobSearchResult, type Application, JobPlacement, EmploymentType, JobStatus, ApplicationStatus } from './jobs.service';
export { ProfilesService, type ApplicantProfile, type NonprofitProfile, type Education, type Experience, type Certification, type Skill, Gender, AvailabilityStatus, OrganizationType, OrganizationSize, SkillCategory, SkillLevel } from './profiles.service';
export { MessagingService, type Conversation, type Message, type Interview, ConversationType, MessageType, MessageStatus, ParticipantRole, InterviewType, InterviewStatus } from './messaging.service';
export { NotificationsService, type Notification, type NotificationPreferences, type NotificationStats, NotificationType, NotificationPriority, NotificationCategory, NotificationFrequency } from './notifications.service';
export { AIService, type JobMatchScore, type JobRecommendation, type ApplicantRecommendation, type AISearchResult, type ContentGenerationResponse, type SkillAnalysis, type ResumeAnalysis } from './ai.service';
