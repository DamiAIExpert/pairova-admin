// src/lib/services/profiles.service.ts
// User profiles API services

import { apiClient, PaginationParams } from '../api';

// Applicant Profile Types
export interface ApplicantProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  bio?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  photoUrl?: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  availabilityStatus: AvailabilityStatus;
  expectedSalary?: number;
  currency?: string;
  preferredJobTypes: EmploymentType[];
  preferredLocations: string[];
  remoteWorkPreference: boolean;
  willingToRelocate: boolean;
  noticePeriod?: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    isVerified: boolean;
  };
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
  skills: Skill[];
}

export interface UpdateApplicantProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  bio?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  availabilityStatus?: AvailabilityStatus;
  expectedSalary?: number;
  currency?: string;
  preferredJobTypes?: EmploymentType[];
  preferredLocations?: string[];
  remoteWorkPreference?: boolean;
  willingToRelocate?: boolean;
  noticePeriod?: number;
}

// Nonprofit Profile Types
export interface NonprofitProfile {
  id: string;
  userId: string;
  orgName: string;
  orgType: OrganizationType;
  description?: string;
  mission?: string;
  websiteUrl?: string;
  logoUrl?: string;
  foundedYear?: number;
  size: OrganizationSize;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  contactEmail?: string;
  taxId?: string;
  registrationNumber?: string;
  isVerified: boolean;
  verificationDocuments?: string[];
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    isVerified: boolean;
  };
  jobs: any[];
}

export interface UpdateNonprofitProfileRequest {
  orgName?: string;
  orgType?: OrganizationType;
  description?: string;
  mission?: string;
  websiteUrl?: string;
  foundedYear?: number;
  size?: OrganizationSize;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  contactEmail?: string;
  taxId?: string;
  registrationNumber?: string;
}

// Education Types
export interface Education {
  id: string;
  applicantId: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  gpa?: number;
  description?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEducationRequest {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  gpa?: number;
  description?: string;
  location?: string;
}

export interface UpdateEducationRequest {
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  gpa?: number;
  description?: string;
  location?: string;
}

// Experience Types
export interface Experience {
  id: string;
  applicantId: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  location?: string;
  employmentType: EmploymentType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExperienceRequest {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  location?: string;
  employmentType: EmploymentType;
}

export interface UpdateExperienceRequest {
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  location?: string;
  employmentType?: EmploymentType;
}

// Certification Types
export interface Certification {
  id: string;
  applicantId: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCertificationRequest {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

export interface UpdateCertificationRequest {
  name?: string;
  issuingOrganization?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

// Skills Types
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  applicantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillRequest {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export interface UpdateSkillRequest {
  name?: string;
  category?: SkillCategory;
  level?: SkillLevel;
}

// Enums
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum AvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
  VOLUNTEER = 'VOLUNTEER',
}

export enum OrganizationType {
  NON_PROFIT = 'NON_PROFIT',
  CHARITY = 'CHARITY',
  FOUNDATION = 'FOUNDATION',
  NGO = 'NGO',
  SOCIAL_ENTERPRISE = 'SOCIAL_ENTERPRISE',
  GOVERNMENT = 'GOVERNMENT',
  RELIGIOUS = 'RELIGIOUS',
  EDUCATIONAL = 'EDUCATIONAL',
  HEALTHCARE = 'HEALTHCARE',
  ENVIRONMENTAL = 'ENVIRONMENTAL',
  OTHER = 'OTHER',
}

export enum OrganizationSize {
  MICRO = 'MICRO', // 1-10
  SMALL = 'SMALL', // 11-50
  MEDIUM = 'MEDIUM', // 51-200
  LARGE = 'LARGE', // 201-500
  ENTERPRISE = 'ENTERPRISE', // 500+
}

export enum SkillCategory {
  TECHNICAL = 'TECHNICAL',
  SOFT = 'SOFT',
  LANGUAGE = 'LANGUAGE',
  PROFESSIONAL = 'PROFESSIONAL',
  CREATIVE = 'CREATIVE',
  ANALYTICAL = 'ANALYTICAL',
  LEADERSHIP = 'LEADERSHIP',
  COMMUNICATION = 'COMMUNICATION',
  OTHER = 'OTHER',
}

export enum SkillLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export class ProfilesService {
  // Applicant Profile endpoints
  static async getApplicantProfile(): Promise<ApplicantProfile> {
    const response = await apiClient.get<ApplicantProfile>('/profiles/applicant/me');
    return response.data;
  }

  static async updateApplicantProfile(data: UpdateApplicantProfileRequest): Promise<ApplicantProfile> {
    const response = await apiClient.put<ApplicantProfile>('/profiles/applicant/me', data);
    return response.data;
  }

  // Nonprofit Profile endpoints
  static async getNonprofitProfile(): Promise<NonprofitProfile> {
    const response = await apiClient.get<NonprofitProfile>('/profiles/nonprofit/me');
    return response.data;
  }

  static async updateNonprofitProfile(data: UpdateNonprofitProfileRequest): Promise<NonprofitProfile> {
    const response = await apiClient.put<NonprofitProfile>('/profiles/nonprofit/me', data);
    return response.data;
  }

  // Education endpoints
  static async getEducation(): Promise<Education[]> {
    const response = await apiClient.get<Education[]>('/profiles/education');
    return response.data;
  }

  static async createEducation(data: CreateEducationRequest): Promise<Education> {
    const response = await apiClient.post<Education>('/profiles/education', data);
    return response.data;
  }

  static async updateEducation(educationId: string, data: UpdateEducationRequest): Promise<Education> {
    const response = await apiClient.put<Education>(`/profiles/education/${educationId}`, data);
    return response.data;
  }

  static async deleteEducation(educationId: string): Promise<void> {
    await apiClient.delete(`/profiles/education/${educationId}`);
  }

  // Experience endpoints
  static async getExperience(): Promise<Experience[]> {
    const response = await apiClient.get<Experience[]>('/profiles/experience');
    return response.data;
  }

  static async createExperience(data: CreateExperienceRequest): Promise<Experience> {
    const response = await apiClient.post<Experience>('/profiles/experience', data);
    return response.data;
  }

  static async updateExperience(experienceId: string, data: UpdateExperienceRequest): Promise<Experience> {
    const response = await apiClient.put<Experience>(`/profiles/experience/${experienceId}`, data);
    return response.data;
  }

  static async deleteExperience(experienceId: string): Promise<void> {
    await apiClient.delete(`/profiles/experience/${experienceId}`);
  }

  // Certification endpoints
  static async getCertifications(): Promise<Certification[]> {
    const response = await apiClient.get<Certification[]>('/profiles/certifications');
    return response.data;
  }

  static async createCertification(data: CreateCertificationRequest): Promise<Certification> {
    const response = await apiClient.post<Certification>('/profiles/certifications', data);
    return response.data;
  }

  static async updateCertification(certificationId: string, data: UpdateCertificationRequest): Promise<Certification> {
    const response = await apiClient.put<Certification>(`/profiles/certifications/${certificationId}`, data);
    return response.data;
  }

  static async deleteCertification(certificationId: string): Promise<void> {
    await apiClient.delete(`/profiles/certifications/${certificationId}`);
  }

  // Skills endpoints
  static async getSkills(): Promise<Skill[]> {
    const response = await apiClient.get<Skill[]>('/profiles/skills');
    return response.data;
  }

  static async createSkill(data: CreateSkillRequest): Promise<Skill> {
    const response = await apiClient.post<Skill>('/profiles/skills', data);
    return response.data;
  }

  static async updateSkill(skillId: string, data: UpdateSkillRequest): Promise<Skill> {
    const response = await apiClient.put<Skill>(`/profiles/skills/${skillId}`, data);
    return response.data;
  }

  static async deleteSkill(skillId: string): Promise<void> {
    await apiClient.delete(`/profiles/skills/${skillId}`);
  }

  // File upload endpoints
  static async uploadFile(file: File, type: 'resume' | 'cover-letter' | 'photo' | 'logo'): Promise<{ url: string; id: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await apiClient.post<{ url: string; id: string }>('/profiles/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async deleteFile(fileId: string): Promise<void> {
    await apiClient.delete(`/profiles/upload/${fileId}`);
  }
}
