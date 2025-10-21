'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService, type LoginRequest, type RegisterRequest, type UserProfile, Role } from '@/lib/services/auth.service';

export function useAuth() {
  const queryClient = useQueryClient();

  // Get current user
  const currentUser = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => AuthService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  // Login mutation
  const login = useMutation({
    mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),
    onSuccess: (data) => {
      // Update user data in cache
      queryClient.setQueryData(['auth', 'user'], data.user);
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // Register mutation
  const register = useMutation({
    mutationFn: (userData: RegisterRequest) => AuthService.register(userData),
    onSuccess: (data) => {
      // Update user data in cache
      queryClient.setQueryData(['auth', 'user'], data.user);
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  // Logout mutation
  const logout = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Remove user data
      queryClient.removeQueries({ queryKey: ['auth', 'user'] });
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  // Forgot password mutation
  const forgotPassword = useMutation({
    mutationFn: (email: string) => AuthService.forgotPassword({ email }),
  });

  // Reset password mutation
  const resetPassword = useMutation({
    mutationFn: (data: { email: string; token: string; newPassword: string }) => 
      AuthService.resetPassword(data),
  });

  // Verify email mutation
  const verifyEmail = useMutation({
    mutationFn: (token: string) => AuthService.verifyEmail(token),
  });

  // Resend verification email mutation
  const resendVerification = useMutation({
    mutationFn: () => AuthService.resendVerificationEmail(),
  });

  // Helper functions
  const isAuthenticated = () => AuthService.isAuthenticated();
  const hasRole = (role: Role) => AuthService.hasRole(role);
  const isAdmin = () => AuthService.isAdmin();
  const isApplicant = () => AuthService.isApplicant();
  const isNonprofit = () => AuthService.isNonprofit();

  return {
    // Data
    user: currentUser.data,
    isLoading: currentUser.isLoading,
    isError: currentUser.isError,
    error: currentUser.error,

    // Mutations
    login: login.mutate,
    loginAsync: login.mutateAsync,
    isLoggingIn: login.isPending,
    loginError: login.error,

    register: register.mutate,
    registerAsync: register.mutateAsync,
    isRegistering: register.isPending,
    registerError: register.error,

    logout: logout.mutate,
    logoutAsync: logout.mutateAsync,
    isLoggingOut: logout.isPending,
    logoutError: logout.error,

    forgotPassword: forgotPassword.mutate,
    forgotPasswordAsync: forgotPassword.mutateAsync,
    isForgotPasswordLoading: forgotPassword.isPending,
    forgotPasswordError: forgotPassword.error,

    resetPassword: resetPassword.mutate,
    resetPasswordAsync: resetPassword.mutateAsync,
    isResetPasswordLoading: resetPassword.isPending,
    resetPasswordError: resetPassword.error,

    verifyEmail: verifyEmail.mutate,
    verifyEmailAsync: verifyEmail.mutateAsync,
    isVerifyingEmail: verifyEmail.isPending,
    verifyEmailError: verifyEmail.error,

    resendVerification: resendVerification.mutate,
    resendVerificationAsync: resendVerification.mutateAsync,
    isResendingVerification: resendVerification.isPending,
    resendVerificationError: resendVerification.error,

    // Helper functions
    isAuthenticated,
    hasRole,
    isAdmin,
    isApplicant,
    isNonprofit,

    // Refetch
    refetchUser: currentUser.refetch,
  };
}
