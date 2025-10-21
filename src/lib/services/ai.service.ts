// src/lib/services/ai.service.ts
// AI and matching API services

import { apiClient } from '../api';

// AI Types
export interface JobMatchScore {
  jobId: string;
  applicantId: string;
  score: number; // 0-100
  factors: {
    skills: number;
    experience: number;
    location: number;
    salary: number;
    preferences: number;
  };
  breakdown: {
    skillMatches: Array<{
      skill: string;
      required: boolean;
      match: boolean;
      weight: number;
    }>;
    experienceMatch: {
      required: number;
      actual: number;
      match: boolean;
    };
    locationMatch: {
      preferred: boolean;
      remote: boolean;
      distance?: number;
    };
    salaryMatch: {
      expected: number;
      offered: number;
      match: boolean;
    };
  };
  recommendations: string[];
  createdAt: string;
}

export interface CalculateMatchScoreRequest {
  jobId: string;
  applicantId: string;
}

export interface JobRecommendation {
  jobId: string;
  title: string;
  nonprofit: {
    orgName: string;
    logoUrl?: string;
  };
  score: number;
  reasons: string[];
  matchFactors: {
    skills: string[];
    experience: boolean;
    location: boolean;
    salary: boolean;
  };
  createdAt: string;
}

export interface ApplicantRecommendation {
  applicantId: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl?: string;
  score: number;
  reasons: string[];
  matchFactors: {
    skills: string[];
    experience: boolean;
    location: boolean;
    salary: boolean;
  };
  createdAt: string;
}

export interface AISearchRequest {
  query: string;
  filters?: {
    location?: string;
    employmentType?: string;
    experienceLevel?: string;
    salaryRange?: {
      min: number;
      max: number;
    };
    skills?: string[];
  };
  limit?: number;
}

export interface AISearchResult {
  results: Array<{
    id: string;
    type: 'job' | 'applicant' | 'nonprofit';
    title: string;
    description: string;
    score: number;
    metadata: Record<string, any>;
  }>;
  total: number;
  query: string;
  suggestions: string[];
}

export interface ContentGenerationRequest {
  type: 'job_description' | 'cover_letter' | 'profile_summary' | 'interview_questions';
  context: {
    jobTitle?: string;
    companyName?: string;
    applicantProfile?: any;
    jobRequirements?: string[];
    experience?: string;
  };
  tone?: 'professional' | 'casual' | 'formal' | 'friendly';
  length?: 'short' | 'medium' | 'long';
}

export interface ContentGenerationResponse {
  content: string;
  suggestions: string[];
  metadata: {
    wordCount: number;
    readingTime: number;
    tone: string;
    confidence: number;
  };
}

export interface SkillAnalysis {
  skills: Array<{
    name: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    confidence: number;
    context: string[];
  }>;
  summary: {
    totalSkills: number;
    topCategories: string[];
    skillGaps: string[];
    recommendations: string[];
  };
}

export interface ResumeAnalysis {
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    skills: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    year: string;
  }>;
  skills: string[];
  summary: {
    yearsOfExperience: number;
    keyStrengths: string[];
    areasForImprovement: string[];
    overallScore: number;
  };
}

export class AIService {
  // Job matching endpoints
  static async calculateMatchScore(data: CalculateMatchScoreRequest): Promise<JobMatchScore> {
    const response = await apiClient.post<JobMatchScore>('/ai/match-score', data);
    return response.data;
  }

  static async getJobRecommendations(params: {
    applicantId?: string;
    limit?: number;
    minScore?: number;
  } = {}): Promise<JobRecommendation[]> {
    const response = await apiClient.get<JobRecommendation[]>('/ai/job-recommendations', params);
    return response.data;
  }

  static async getApplicantRecommendations(params: {
    jobId?: string;
    nonprofitId?: string;
    limit?: number;
    minScore?: number;
  } = {}): Promise<ApplicantRecommendation[]> {
    const response = await apiClient.get<ApplicantRecommendation[]>('/ai/applicant-recommendations', params);
    return response.data;
  }

  static async getMatchHistory(params: {
    jobId?: string;
    applicantId?: string;
    limit?: number;
  } = {}): Promise<JobMatchScore[]> {
    const response = await apiClient.get<JobMatchScore[]>('/ai/match-history', params);
    return response.data;
  }

  // AI search endpoints
  static async search(data: AISearchRequest): Promise<AISearchResult> {
    const response = await apiClient.post<AISearchResult>('/ai/search', data);
    return response.data;
  }

  static async getSearchSuggestions(query: string): Promise<string[]> {
    const response = await apiClient.get<string[]>('/ai/search/suggestions', { q: query });
    return response.data;
  }

  // Content generation endpoints
  static async generateContent(data: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    const response = await apiClient.post<ContentGenerationResponse>('/ai/generate-content', data);
    return response.data;
  }

  static async generateJobDescription(data: {
    jobTitle: string;
    companyName: string;
    requirements: string[];
    responsibilities: string[];
    benefits?: string[];
  }): Promise<ContentGenerationResponse> {
    const response = await apiClient.post<ContentGenerationResponse>('/ai/generate-job-description', data);
    return response.data;
  }

  static async generateCoverLetter(data: {
    jobTitle: string;
    companyName: string;
    applicantProfile: any;
    jobDescription: string;
  }): Promise<ContentGenerationResponse> {
    const response = await apiClient.post<ContentGenerationResponse>('/ai/generate-cover-letter', data);
    return response.data;
  }

  static async generateInterviewQuestions(data: {
    jobTitle: string;
    jobDescription: string;
    applicantProfile: any;
    questionType: 'technical' | 'behavioral' | 'situational' | 'general';
    count?: number;
  }): Promise<ContentGenerationResponse> {
    const response = await apiClient.post<ContentGenerationResponse>('/ai/generate-interview-questions', data);
    return response.data;
  }

  // Analysis endpoints
  static async analyzeSkills(text: string): Promise<SkillAnalysis> {
    const response = await apiClient.post<SkillAnalysis>('/ai/analyze-skills', { text });
    return response.data;
  }

  static async analyzeResume(file: File): Promise<ResumeAnalysis> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<ResumeAnalysis>('/ai/analyze-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async analyzeJobDescription(text: string): Promise<{
    skills: string[];
    requirements: string[];
    responsibilities: string[];
    experience: {
      min: number;
      max: number;
    };
    salary: {
      min?: number;
      max?: number;
    };
    location: string;
    employmentType: string;
  }> {
    const response = await apiClient.post('/ai/analyze-job-description', { text });
    return response.data;
  }

  // Optimization endpoints
  static async optimizeProfile(data: {
    profileType: 'applicant' | 'nonprofit';
    currentProfile: any;
    targetJob?: string;
  }): Promise<{
    suggestions: string[];
    improvements: Array<{
      field: string;
      current: string;
      suggested: string;
      reason: string;
    }>;
    score: {
      before: number;
      after: number;
    };
  }> {
    const response = await apiClient.post('/ai/optimize-profile', data);
    return response.data;
  }

  static async optimizeJobPosting(data: {
    jobPosting: any;
    targetAudience?: string;
  }): Promise<{
    suggestions: string[];
    improvements: Array<{
      field: string;
      current: string;
      suggested: string;
      reason: string;
    }>;
    score: {
      before: number;
      after: number;
    };
  }> {
    const response = await apiClient.post('/ai/optimize-job-posting', data);
    return response.data;
  }

  // Chat and assistance endpoints
  static async chat(data: {
    message: string;
    context?: {
      type: 'job_search' | 'application' | 'profile' | 'general';
      data?: any;
    };
    conversationId?: string;
  }): Promise<{
    response: string;
    suggestions: string[];
    conversationId: string;
    metadata: {
      confidence: number;
      sources: string[];
    };
  }> {
    const response = await apiClient.post('/ai/chat', data);
    return response.data;
  }

  static async getChatHistory(conversationId: string): Promise<Array<{
    role: 'user' | 'assistant';
    message: string;
    timestamp: string;
  }>> {
    const response = await apiClient.get(`/ai/chat/${conversationId}/history`);
    return response.data;
  }
}
