// src/lib/hooks/index.ts
// Export all custom hooks

export { useAuth } from './useAuth';
export { useAdmin, useAdminService } from './useAdmin';
export { useJobs, useJob, useApplications, useApplication, useSavedJobs } from './useJobs';
export { 
  useApplicantProfile, 
  useNonprofitProfile, 
  useEducation, 
  useExperience, 
  useCertifications, 
  useSkills, 
  useFileUpload 
} from './useProfiles';
export { useChat } from './useChat';
export { useApi, useMutation, usePaginatedApi } from './useApi';
