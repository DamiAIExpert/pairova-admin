'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { JobsService, type Job, type CreateJobRequest, type JobSearchParams, type Application, type JobSearchResult } from '@/lib/services/jobs.service';

export function useJobs(params: JobSearchParams = {}) {
  const queryClient = useQueryClient();

  // Get jobs
  const jobs = useQuery({
    queryKey: ['jobs', 'list', params],
    queryFn: () => JobsService.getJobs(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Get featured jobs
  const featuredJobs = useQuery({
    queryKey: ['jobs', 'featured', params],
    queryFn: () => JobsService.getFeaturedJobs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get recommended jobs
  const recommendedJobs = useQuery({
    queryKey: ['jobs', 'recommended', params],
    queryFn: () => JobsService.getRecommendedJobs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create job mutation
  const createJob = useMutation({
    mutationFn: (jobData: CreateJobRequest) => JobsService.createJob(jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  // Update job mutation
  const updateJob = useMutation({
    mutationFn: ({ jobId, data }: { jobId: string; data: Partial<CreateJobRequest> }) => 
      JobsService.updateJob(jobId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  // Delete job mutation
  const deleteJob = useMutation({
    mutationFn: (jobId: string) => JobsService.deleteJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  // Publish job mutation
  const publishJob = useMutation({
    mutationFn: (jobId: string) => JobsService.publishJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  // Close job mutation
  const closeJob = useMutation({
    mutationFn: (jobId: string) => JobsService.closeJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  return {
    // Data
    jobs: jobs.data,
    isLoading: jobs.isLoading,
    isError: jobs.isError,
    error: jobs.error,

    featuredJobs: featuredJobs.data,
    isFeaturedLoading: featuredJobs.isLoading,

    recommendedJobs: recommendedJobs.data,
    isRecommendedLoading: recommendedJobs.isLoading,

    // Mutations
    createJob: createJob.mutate,
    createJobAsync: createJob.mutateAsync,
    isCreatingJob: createJob.isPending,
    createJobError: createJob.error,

    updateJob: updateJob.mutate,
    updateJobAsync: updateJob.mutateAsync,
    isUpdatingJob: updateJob.isPending,
    updateJobError: updateJob.error,

    deleteJob: deleteJob.mutate,
    deleteJobAsync: deleteJob.mutateAsync,
    isDeletingJob: deleteJob.isPending,
    deleteJobError: deleteJob.error,

    publishJob: publishJob.mutate,
    publishJobAsync: publishJob.mutateAsync,
    isPublishingJob: publishJob.isPending,
    publishJobError: publishJob.error,

    closeJob: closeJob.mutate,
    closeJobAsync: closeJob.mutateAsync,
    isClosingJob: closeJob.isPending,
    closeJobError: closeJob.error,

    // Refetch
    refetch: jobs.refetch,
    refetchFeatured: featuredJobs.refetch,
    refetchRecommended: recommendedJobs.refetch,
  };
}

export function useJob(jobId: string) {
  const queryClient = useQueryClient();

  // Get single job
  const job = useQuery({
    queryKey: ['jobs', 'detail', jobId],
    queryFn: () => JobsService.getJob(jobId),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update job mutation
  const updateJob = useMutation({
    mutationFn: (data: Partial<CreateJobRequest>) => JobsService.updateJob(jobId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs', 'detail', jobId] });
      queryClient.invalidateQueries({ queryKey: ['jobs', 'list'] });
    },
  });

  return {
    // Data
    job: job.data,
    isLoading: job.isLoading,
    isError: job.isError,
    error: job.error,

    // Mutations
    updateJob: updateJob.mutate,
    updateJobAsync: updateJob.mutateAsync,
    isUpdatingJob: updateJob.isPending,
    updateJobError: updateJob.error,

    // Refetch
    refetch: job.refetch,
  };
}

export function useApplications(params: { page?: number; limit?: number } = {}) {
  const queryClient = useQueryClient();

  // Get my applications
  const applications = useQuery({
    queryKey: ['applications', 'my', params],
    queryFn: () => JobsService.getMyApplications(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Apply for job mutation
  const applyForJob = useMutation({
    mutationFn: (data: { jobId: string; coverLetter?: string; resumeUploadId?: string }) => 
      JobsService.applyForJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  return {
    // Data
    applications: applications.data,
    isLoading: applications.isLoading,
    isError: applications.isError,
    error: applications.error,

    // Mutations
    applyForJob: applyForJob.mutate,
    applyForJobAsync: applyForJob.mutateAsync,
    isApplyingForJob: applyForJob.isPending,
    applyForJobError: applyForJob.error,

    // Refetch
    refetch: applications.refetch,
  };
}

export function useApplication(applicationId: string) {
  const queryClient = useQueryClient();

  // Get single application
  const application = useQuery({
    queryKey: ['applications', 'detail', applicationId],
    queryFn: () => JobsService.getApplication(applicationId),
    enabled: !!applicationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update application status mutation
  const updateApplicationStatus = useMutation({
    mutationFn: ({ status, notes }: { status: any; notes?: string }) => 
      JobsService.updateApplicationStatus(applicationId, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', 'detail', applicationId] });
      queryClient.invalidateQueries({ queryKey: ['applications', 'my'] });
    },
  });

  return {
    // Data
    application: application.data,
    isLoading: application.isLoading,
    isError: application.isError,
    error: application.error,

    // Mutations
    updateApplicationStatus: updateApplicationStatus.mutate,
    updateApplicationStatusAsync: updateApplicationStatus.mutateAsync,
    isUpdatingApplicationStatus: updateApplicationStatus.isPending,
    updateApplicationStatusError: updateApplicationStatus.error,

    // Refetch
    refetch: application.refetch,
  };
}

export function useSavedJobs(params: { page?: number; limit?: number } = {}) {
  const queryClient = useQueryClient();

  // Get saved jobs
  const savedJobs = useQuery({
    queryKey: ['saved-jobs', params],
    queryFn: () => JobsService.getSavedJobs(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Save job mutation
  const saveJob = useMutation({
    mutationFn: (jobId: string) => JobsService.saveJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
    },
  });

  // Unsave job mutation
  const unsaveJob = useMutation({
    mutationFn: (jobId: string) => JobsService.unsaveJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
    },
  });

  // Check if job is saved
  const isJobSaved = useQuery({
    queryKey: ['saved-jobs', 'status'],
    queryFn: () => JobsService.isJobSaved,
    enabled: false, // Only call when needed
  });

  return {
    // Data
    savedJobs: savedJobs.data,
    isLoading: savedJobs.isLoading,
    isError: savedJobs.isError,
    error: savedJobs.error,

    // Mutations
    saveJob: saveJob.mutate,
    saveJobAsync: saveJob.mutateAsync,
    isSavingJob: saveJob.isPending,
    saveJobError: saveJob.error,

    unsaveJob: unsaveJob.mutate,
    unsaveJobAsync: unsaveJob.mutateAsync,
    isUnsavingJob: unsaveJob.isPending,
    unsaveJobError: unsaveJob.error,

    // Helper
    checkIfJobSaved: (jobId: string) => JobsService.isJobSaved(jobId),

    // Refetch
    refetch: savedJobs.refetch,
  };
}
