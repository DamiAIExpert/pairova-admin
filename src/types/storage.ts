// types/storage.ts
export enum StorageType {
  CLOUDINARY = 'cloudinary',
  AWS_S3 = 'aws_s3',
  GOOGLE_CLOUD_STORAGE = 'google_cloud_storage',
  AZURE_BLOB = 'azure_blob',
  LOCAL = 'local',
}

export enum FileType {
  PROFILE_PICTURE = 'profile_picture',
  COMPANY_LOGO = 'company_logo',
  NGO_LOGO = 'ngo_logo',
  RESUME = 'resume',
  COVER_LETTER = 'cover_letter',
  CERTIFICATE = 'certificate',
  DOCUMENT = 'document',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  OTHER = 'other',
}

export interface StorageProvider {
  id: string;
  name: string;
  type: StorageType;
  isActive: boolean;
  priority: number;
  description?: string;
  usageCount: number;
  totalStorageUsed: number;
  isHealthy: boolean;
  lastHealthCheck?: Date;
  healthCheckError?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface StorageProviderHealth {
  id: string;
  name: string;
  type: StorageType;
  isHealthy: boolean;
  responseTime: number;
  error?: string;
  checkedAt: Date;
  status: Record<string, any>;
}

export interface StorageUsage {
  totalFiles: number;
  totalStorage: number;
  providers: Array<{
    id: string;
    name: string;
    type: StorageType;
    usageCount: number;
    totalStorageUsed: number;
    isHealthy: boolean;
  }>;
}

export interface CreateStorageProviderRequest {
  name: string;
  type: StorageType;
  description?: string;
  priority: number;
  isActive?: boolean;
  configuration: StorageProviderConfiguration;
}

export interface UpdateStorageProviderRequest {
  name?: string;
  description?: string;
  priority?: number;
  isActive?: boolean;
  configuration?: Record<string, any>;
}

export interface StorageProviderConfiguration {
  // Cloudinary
  cloudName?: string;
  apiKey?: string;
  apiSecret?: string;
  defaultFolder?: string;
  defaultTransformations?: Record<string, any>;

  // AWS S3
  bucketName?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  region?: string;
  endpoint?: string;

  // Google Cloud Storage
  projectId?: string;
  serviceAccountKey?: string;

  // Azure Blob Storage
  accountName?: string;
  accountKey?: string;
  containerName?: string;

  // Local Storage
  uploadPath?: string;
  baseUrl?: string;
  maxFileSize?: number;
}

export interface FileUpload {
  id: string;
  filename: string;
  originalFilename: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  fileType: FileType;
  folder?: string;
  metadata?: Record<string, any>;
  publicId?: string;
  isPublic: boolean;
  userId?: string;
  storageProviderId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface FileUploadRequest {
  file: File;
  fileType?: FileType;
  folder?: string;
  isPublic?: boolean;
  metadata?: Record<string, any>;
}

export interface FileUploadResponse {
  id: string;
  url: string;
  thumbnailUrl?: string;
  size: number;
  mimeType: string;
  fileType: FileType;
  storageProvider: string;
  uploadedAt: Date;
}

export interface StorageProviderStats {
  usageCount: number;
  totalStorageUsed: number;
  averageFileSize: number;
  fileCount: number;
}

