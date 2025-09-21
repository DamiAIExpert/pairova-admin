'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Cloudinary, 
  Aws, 
  Google, 
  Azure, 
  HardDrive,
  TestTube,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { StorageProvider } from '@/types/storage';

const storageProviderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['cloudinary', 'aws_s3', 'google_cloud_storage', 'azure_blob', 'local']),
  description: z.string().optional(),
  priority: z.number().min(1).max(100),
  isActive: z.boolean(),
  configuration: z.record(z.any()),
});

type StorageProviderFormData = z.infer<typeof storageProviderSchema>;

interface StorageProviderFormProps {
  provider?: StorageProvider;
  onSubmit: (data: StorageProviderFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const getProviderIcon = (type: string) => {
  switch (type) {
    case 'cloudinary':
      return <Cloudinary className="h-5 w-5 text-blue-500" />;
    case 'aws_s3':
      return <Aws className="h-5 w-5 text-orange-500" />;
    case 'google_cloud_storage':
      return <Google className="h-5 w-5 text-green-500" />;
    case 'azure_blob':
      return <Azure className="h-5 w-5 text-blue-600" />;
    case 'local':
      return <HardDrive className="h-5 w-5 text-gray-500" />;
    default:
      return <HardDrive className="h-5 w-5 text-gray-500" />;
  }
};

const getProviderDescription = (type: string) => {
  switch (type) {
    case 'cloudinary':
      return 'Cloud-based image and video management service with built-in transformations';
    case 'aws_s3':
      return 'Amazon Simple Storage Service - scalable object storage';
    case 'google_cloud_storage':
      return 'Google Cloud Storage - unified object storage for developers';
    case 'azure_blob':
      return 'Microsoft Azure Blob Storage - cloud storage solution';
    case 'local':
      return 'Local file system storage';
    default:
      return 'Unknown storage type';
  }
};

export default function StorageProviderForm({
  provider,
  onSubmit,
  onCancel,
  isLoading = false,
}: StorageProviderFormProps) {
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const form = useForm<StorageProviderFormData>({
    resolver: zodResolver(storageProviderSchema),
    defaultValues: {
      name: provider?.name || '',
      type: provider?.type || 'cloudinary',
      description: provider?.description || '',
      priority: provider?.priority || 1,
      isActive: provider?.isActive ?? true,
      configuration: provider?.configuration || {},
    },
  });

  const selectedType = form.watch('type');

  const renderConfigurationFields = () => {
    switch (selectedType) {
      case 'cloudinary':
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="configuration.cloudName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cloud Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-cloud-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="your-api-key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.apiSecret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Secret</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="your-api-secret" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.defaultFolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Folder (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="pairova" {...field} />
                  </FormControl>
                  <FormDescription>
                    Default folder for uploaded files
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 'aws_s3':
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="configuration.bucketName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bucket Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-bucket-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.accessKeyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Key ID</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="your-access-key-id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.secretAccessKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secret Access Key</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="your-secret-access-key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="us-east-1" {...field} />
                  </FormControl>
                  <FormDescription>
                    AWS region where your bucket is located
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Endpoint (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://s3.amazonaws.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    For S3-compatible services like DigitalOcean Spaces or MinIO
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 'google_cloud_storage':
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="configuration.projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project ID</FormLabel>
                  <FormControl>
                    <Input placeholder="your-project-id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.bucketName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bucket Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-bucket-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.serviceAccountKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Account Key (JSON)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder='{"type": "service_account", "project_id": "..."}' 
                      rows={6}
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Paste your Google Cloud service account JSON key
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 'azure_blob':
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="configuration.accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-storage-account" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.accountKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Key</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="your-account-key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.containerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Container Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-container-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 'local':
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="configuration.uploadPath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Path</FormLabel>
                  <FormControl>
                    <Input placeholder="/var/www/uploads" {...field} />
                  </FormControl>
                  <FormDescription>
                    Local directory path for storing files
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.baseUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourdomain.com/uploads" {...field} />
                  </FormControl>
                  <FormDescription>
                    Base URL for serving uploaded files
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="configuration.maxFileSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max File Size (bytes)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10485760" {...field} />
                  </FormControl>
                  <FormDescription>
                    Maximum file size in bytes (default: 10MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const formData = form.getValues();
      // Here you would call your API to test the connection
      // const result = await testStorageProviderConnection(formData);
      
      // Mock test result for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestResult({
        success: true,
        message: 'Connection test successful!',
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Connection test failed',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getProviderIcon(selectedType)}
            <span>
              {provider ? 'Edit Storage Provider' : 'Add New Storage Provider'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Cloudinary Account" {...field} />
                      </FormControl>
                      <FormDescription>
                        A friendly name for this storage provider
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select storage type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cloudinary">
                            <div className="flex items-center space-x-2">
                              <Cloudinary className="h-4 w-4" />
                              <span>Cloudinary</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="aws_s3">
                            <div className="flex items-center space-x-2">
                              <Aws className="h-4 w-4" />
                              <span>AWS S3</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="google_cloud_storage">
                            <div className="flex items-center space-x-2">
                              <Google className="h-4 w-4" />
                              <span>Google Cloud Storage</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="azure_blob">
                            <div className="flex items-center space-x-2">
                              <Azure className="h-4 w-4" />
                              <span>Azure Blob Storage</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="local">
                            <div className="flex items-center space-x-2">
                              <HardDrive className="h-4 w-4" />
                              <span>Local Storage</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {getProviderDescription(selectedType)}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description of this storage provider..."
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            max="100" 
                            placeholder="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Lower number = higher priority
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Active</FormLabel>
                          <FormDescription>
                            Enable this storage provider
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Configuration Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuration</h3>
                {renderConfigurationFields()}
              </div>

              {/* Test Connection */}
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="w-full"
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  {isTesting ? 'Testing Connection...' : 'Test Connection'}
                </Button>

                {testResult && (
                  <Alert className={testResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                    <div className="flex items-center space-x-2">
                      {testResult.success ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription className={testResult.success ? 'text-green-800' : 'text-red-800'}>
                        {testResult.message}
                      </AlertDescription>
                    </div>
                  </Alert>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Saving...' : provider ? 'Update Provider' : 'Create Provider'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
