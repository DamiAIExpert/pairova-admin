'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  ProfilesService, 
  type ApplicantProfile, 
  type NonprofitProfile, 
  type Education, 
  type Experience, 
  type Certification, 
  type Skill,
  type UpdateApplicantProfileRequest,
  type UpdateNonprofitProfileRequest,
  type CreateEducationRequest,
  type UpdateEducationRequest,
  type CreateExperienceRequest,
  type UpdateExperienceRequest,
  type CreateCertificationRequest,
  type UpdateCertificationRequest,
  type CreateSkillRequest,
  type UpdateSkillRequest
} from '@/lib/services/profiles.service';

export function useApplicantProfile() {
  const queryClient = useQueryClient();

  // Get applicant profile
  const profile = useQuery({
    queryKey: ['profiles', 'applicant'],
    queryFn: () => ProfilesService.getApplicantProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update applicant profile mutation
  const updateProfile = useMutation({
    mutationFn: (data: UpdateApplicantProfileRequest) => ProfilesService.updateApplicantProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'applicant'] });
    },
  });

  return {
    // Data
    profile: profile.data,
    isLoading: profile.isLoading,
    isError: profile.isError,
    error: profile.error,

    // Mutations
    updateProfile: updateProfile.mutate,
    updateProfileAsync: updateProfile.mutateAsync,
    isUpdatingProfile: updateProfile.isPending,
    updateProfileError: updateProfile.error,

    // Refetch
    refetch: profile.refetch,
  };
}

export function useNonprofitProfile() {
  const queryClient = useQueryClient();

  // Get nonprofit profile
  const profile = useQuery({
    queryKey: ['profiles', 'nonprofit'],
    queryFn: () => ProfilesService.getNonprofitProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update nonprofit profile mutation
  const updateProfile = useMutation({
    mutationFn: (data: UpdateNonprofitProfileRequest) => ProfilesService.updateNonprofitProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'nonprofit'] });
    },
  });

  return {
    // Data
    profile: profile.data,
    isLoading: profile.isLoading,
    isError: profile.isError,
    error: profile.error,

    // Mutations
    updateProfile: updateProfile.mutate,
    updateProfileAsync: updateProfile.mutateAsync,
    isUpdatingProfile: updateProfile.isPending,
    updateProfileError: updateProfile.error,

    // Refetch
    refetch: profile.refetch,
  };
}

export function useEducation() {
  const queryClient = useQueryClient();

  // Get education
  const education = useQuery({
    queryKey: ['profiles', 'education'],
    queryFn: () => ProfilesService.getEducation(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create education mutation
  const createEducation = useMutation({
    mutationFn: (data: CreateEducationRequest) => ProfilesService.createEducation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'education'] });
    },
  });

  // Update education mutation
  const updateEducation = useMutation({
    mutationFn: ({ educationId, data }: { educationId: string; data: UpdateEducationRequest }) => 
      ProfilesService.updateEducation(educationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'education'] });
    },
  });

  // Delete education mutation
  const deleteEducation = useMutation({
    mutationFn: (educationId: string) => ProfilesService.deleteEducation(educationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'education'] });
    },
  });

  return {
    // Data
    education: education.data,
    isLoading: education.isLoading,
    isError: education.isError,
    error: education.error,

    // Mutations
    createEducation: createEducation.mutate,
    createEducationAsync: createEducation.mutateAsync,
    isCreatingEducation: createEducation.isPending,
    createEducationError: createEducation.error,

    updateEducation: updateEducation.mutate,
    updateEducationAsync: updateEducation.mutateAsync,
    isUpdatingEducation: updateEducation.isPending,
    updateEducationError: updateEducation.error,

    deleteEducation: deleteEducation.mutate,
    deleteEducationAsync: deleteEducation.mutateAsync,
    isDeletingEducation: deleteEducation.isPending,
    deleteEducationError: deleteEducation.error,

    // Refetch
    refetch: education.refetch,
  };
}

export function useExperience() {
  const queryClient = useQueryClient();

  // Get experience
  const experience = useQuery({
    queryKey: ['profiles', 'experience'],
    queryFn: () => ProfilesService.getExperience(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create experience mutation
  const createExperience = useMutation({
    mutationFn: (data: CreateExperienceRequest) => ProfilesService.createExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'experience'] });
    },
  });

  // Update experience mutation
  const updateExperience = useMutation({
    mutationFn: ({ experienceId, data }: { experienceId: string; data: UpdateExperienceRequest }) => 
      ProfilesService.updateExperience(experienceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'experience'] });
    },
  });

  // Delete experience mutation
  const deleteExperience = useMutation({
    mutationFn: (experienceId: string) => ProfilesService.deleteExperience(experienceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'experience'] });
    },
  });

  return {
    // Data
    experience: experience.data,
    isLoading: experience.isLoading,
    isError: experience.isError,
    error: experience.error,

    // Mutations
    createExperience: createExperience.mutate,
    createExperienceAsync: createExperience.mutateAsync,
    isCreatingExperience: createExperience.isPending,
    createExperienceError: createExperience.error,

    updateExperience: updateExperience.mutate,
    updateExperienceAsync: updateExperience.mutateAsync,
    isUpdatingExperience: updateExperience.isPending,
    updateExperienceError: updateExperience.error,

    deleteExperience: deleteExperience.mutate,
    deleteExperienceAsync: deleteExperience.mutateAsync,
    isDeletingExperience: deleteExperience.isPending,
    deleteExperienceError: deleteExperience.error,

    // Refetch
    refetch: experience.refetch,
  };
}

export function useCertifications() {
  const queryClient = useQueryClient();

  // Get certifications
  const certifications = useQuery({
    queryKey: ['profiles', 'certifications'],
    queryFn: () => ProfilesService.getCertifications(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create certification mutation
  const createCertification = useMutation({
    mutationFn: (data: CreateCertificationRequest) => ProfilesService.createCertification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'certifications'] });
    },
  });

  // Update certification mutation
  const updateCertification = useMutation({
    mutationFn: ({ certificationId, data }: { certificationId: string; data: UpdateCertificationRequest }) => 
      ProfilesService.updateCertification(certificationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'certifications'] });
    },
  });

  // Delete certification mutation
  const deleteCertification = useMutation({
    mutationFn: (certificationId: string) => ProfilesService.deleteCertification(certificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'certifications'] });
    },
  });

  return {
    // Data
    certifications: certifications.data,
    isLoading: certifications.isLoading,
    isError: certifications.isError,
    error: certifications.error,

    // Mutations
    createCertification: createCertification.mutate,
    createCertificationAsync: createCertification.mutateAsync,
    isCreatingCertification: createCertification.isPending,
    createCertificationError: createCertification.error,

    updateCertification: updateCertification.mutate,
    updateCertificationAsync: updateCertification.mutateAsync,
    isUpdatingCertification: updateCertification.isPending,
    updateCertificationError: updateCertification.error,

    deleteCertification: deleteCertification.mutate,
    deleteCertificationAsync: deleteCertification.mutateAsync,
    isDeletingCertification: deleteCertification.isPending,
    deleteCertificationError: deleteCertification.error,

    // Refetch
    refetch: certifications.refetch,
  };
}

export function useSkills() {
  const queryClient = useQueryClient();

  // Get skills
  const skills = useQuery({
    queryKey: ['profiles', 'skills'],
    queryFn: () => ProfilesService.getSkills(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create skill mutation
  const createSkill = useMutation({
    mutationFn: (data: CreateSkillRequest) => ProfilesService.createSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'skills'] });
    },
  });

  // Update skill mutation
  const updateSkill = useMutation({
    mutationFn: ({ skillId, data }: { skillId: string; data: UpdateSkillRequest }) => 
      ProfilesService.updateSkill(skillId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'skills'] });
    },
  });

  // Delete skill mutation
  const deleteSkill = useMutation({
    mutationFn: (skillId: string) => ProfilesService.deleteSkill(skillId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', 'skills'] });
    },
  });

  return {
    // Data
    skills: skills.data,
    isLoading: skills.isLoading,
    isError: skills.isError,
    error: skills.error,

    // Mutations
    createSkill: createSkill.mutate,
    createSkillAsync: createSkill.mutateAsync,
    isCreatingSkill: createSkill.isPending,
    createSkillError: createSkill.error,

    updateSkill: updateSkill.mutate,
    updateSkillAsync: updateSkill.mutateAsync,
    isUpdatingSkill: updateSkill.isPending,
    updateSkillError: updateSkill.error,

    deleteSkill: deleteSkill.mutate,
    deleteSkillAsync: deleteSkill.mutateAsync,
    isDeletingSkill: deleteSkill.isPending,
    deleteSkillError: deleteSkill.error,

    // Refetch
    refetch: skills.refetch,
  };
}

export function useFileUpload() {
  const queryClient = useQueryClient();

  // Upload file mutation
  const uploadFile = useMutation({
    mutationFn: ({ file, type }: { file: File; type: 'resume' | 'cover-letter' | 'photo' | 'logo' }) => 
      ProfilesService.uploadFile(file, type),
    onSuccess: () => {
      // Invalidate profile queries to refresh with new file URLs
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });

  // Delete file mutation
  const deleteFile = useMutation({
    mutationFn: (fileId: string) => ProfilesService.deleteFile(fileId),
    onSuccess: () => {
      // Invalidate profile queries to refresh without deleted file
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });

  return {
    // Mutations
    uploadFile: uploadFile.mutate,
    uploadFileAsync: uploadFile.mutateAsync,
    isUploadingFile: uploadFile.isPending,
    uploadFileError: uploadFile.error,

    deleteFile: deleteFile.mutate,
    deleteFileAsync: deleteFile.mutateAsync,
    isDeletingFile: deleteFile.isPending,
    deleteFileError: deleteFile.error,
  };
}
