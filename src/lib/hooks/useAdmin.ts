'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '@/lib/services/admin.service';
import { 
  CreateStorageProviderRequest, 
  UpdateStorageProviderRequest,
  StorageProvider,
  StorageUsage,
  StorageProviderHealth 
} from '@/types/storage';

export function useAdminService() {
  const queryClient = useQueryClient();

  // Storage Provider Management
  const storageProviders = useQuery({
    queryKey: ['admin', 'storage', 'providers'],
    queryFn: () => AdminService.getStorageProviders(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const storageStats = useQuery({
    queryKey: ['admin', 'storage', 'stats'],
    queryFn: () => AdminService.getStorageStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const supportedStorageTypes = useQuery({
    queryKey: ['admin', 'storage', 'types'],
    queryFn: () => AdminService.getSupportedStorageTypes(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  const createStorageProvider = useMutation({
    mutationFn: (data: CreateStorageProviderRequest) => AdminService.createStorageProvider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'storage'] });
    },
  });

  const updateStorageProvider = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStorageProviderRequest }) => 
      AdminService.updateStorageProvider(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'storage'] });
    },
  });

  const deleteStorageProvider = useMutation({
    mutationFn: (id: string) => AdminService.deleteStorageProvider(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'storage'] });
    },
  });

  const testStorageProviderConnection = useMutation({
    mutationFn: (id: string) => AdminService.testStorageProviderConnection(id),
  });

  const performStorageHealthCheck = useMutation({
    mutationFn: (id?: string) => AdminService.performStorageHealthCheck(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'storage'] });
    },
  });

  const activateStorageProvider = useMutation({
    mutationFn: (id: string) => AdminService.activateStorageProvider(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'storage'] });
    },
  });

  const deactivateStorageProvider = useMutation({
    mutationFn: (id: string) => AdminService.deactivateStorageProvider(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'storage'] });
    },
  });

  const updateStorageProviderPriority = useMutation({
    mutationFn: ({ id, priority }: { id: string; priority: number }) => 
      AdminService.updateStorageProviderPriority(id, priority),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'storage'] });
    },
  });

  return {
    // Storage Provider Management
    storageProviders,
    storageStats,
    supportedStorageTypes,
    createStorageProvider,
    updateStorageProvider,
    deleteStorageProvider,
    testStorageProviderConnection,
    performStorageHealthCheck,
    activateStorageProvider,
    deactivateStorageProvider,
    updateStorageProviderPriority,

    // Storage Service for direct API calls
    storageService: {
      getProviders: () => AdminService.getStorageProviders(),
      getStorageStats: () => AdminService.getStorageStats(),
      createProvider: (data: CreateStorageProviderRequest) => AdminService.createStorageProvider(data),
      updateProvider: (id: string, data: UpdateStorageProviderRequest) => AdminService.updateStorageProvider(id, data),
      deleteProvider: (id: string) => AdminService.deleteStorageProvider(id),
      testProviderConnection: (id: string) => AdminService.testStorageProviderConnection(id),
      performHealthCheck: (id?: string) => AdminService.performStorageHealthCheck(id),
      activateProvider: (id: string) => AdminService.activateStorageProvider(id),
      deactivateProvider: (id: string) => AdminService.deactivateStorageProvider(id),
      updateProviderPriority: (id: string, priority: number) => AdminService.updateStorageProviderPriority(id, priority),
    },
  };
}

export function useAdmin() {
  const queryClient = useQueryClient();

  // Dashboard Stats
  const dashboardStats = useQuery({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: () => AdminService.getDashboardStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const performanceMetrics = useQuery({
    queryKey: ['admin', 'dashboard', 'performance'],
    queryFn: () => AdminService.getPerformanceMetrics(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const activityFeed = useQuery({
    queryKey: ['admin', 'dashboard', 'activity'],
    queryFn: () => AdminService.getActivityFeed(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const recommendations = useQuery({
    queryKey: ['admin', 'dashboard', 'recommendations'],
    queryFn: () => AdminService.getRecommendations(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  // User Management
  const users = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => AdminService.getUsers(),
    staleTime: 5 * 60 * 1000,
  });

  const updateUserStatus = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: string }) => 
      AdminService.updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });

  // Job Management
  const jobs = useQuery({
    queryKey: ['admin', 'jobs'],
    queryFn: () => AdminService.getJobs(),
    staleTime: 5 * 60 * 1000,
  });

  const updateJobStatus = useMutation({
    mutationFn: ({ jobId, status }: { jobId: string; status: string }) => 
      AdminService.updateJobStatus(jobId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'jobs'] });
    },
  });

  // Application Management
  const applications = useQuery({
    queryKey: ['admin', 'applications'],
    queryFn: () => AdminService.getApplications(),
    staleTime: 5 * 60 * 1000,
  });

  const updateApplicationStatus = useMutation({
    mutationFn: ({ applicationId, status }: { applicationId: string; status: string }) => 
      AdminService.updateApplicationStatus(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'applications'] });
    },
  });

  return {
    // Dashboard
    dashboardStats,
    performanceMetrics,
    activityFeed,
    recommendations,

    // User Management
    users,
    updateUserStatus,

    // Job Management
    jobs,
    updateJobStatus,

    // Application Management
    applications,
    updateApplicationStatus,

    // Storage Management
    ...useAdminService(),
  };
}
