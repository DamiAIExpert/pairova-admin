'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Cloudinary, 
  Aws, 
  Google, 
  Azure, 
  HardDrive, 
  MoreVertical, 
  TestTube, 
  Settings, 
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { StorageProvider } from '@/types/storage';
import { formatBytes } from '@/lib/utils';

interface StorageProviderCardProps {
  provider: StorageProvider;
  onEdit: (provider: StorageProvider) => void;
  onDelete: (provider: StorageProvider) => void;
  onToggleActive: (provider: StorageProvider) => void;
  onTestConnection: (provider: StorageProvider) => void;
  onHealthCheck: (provider: StorageProvider) => void;
}

const getProviderIcon = (type: string) => {
  switch (type) {
    case 'cloudinary':
      return <Cloudinary className="h-6 w-6 text-blue-500" />;
    case 'aws_s3':
      return <Aws className="h-6 w-6 text-orange-500" />;
    case 'google_cloud_storage':
      return <Google className="h-6 w-6 text-green-500" />;
    case 'azure_blob':
      return <Azure className="h-6 w-6 text-blue-600" />;
    case 'local':
      return <HardDrive className="h-6 w-6 text-gray-500" />;
    default:
      return <HardDrive className="h-6 w-6 text-gray-500" />;
  }
};

const getHealthStatusIcon = (isHealthy: boolean, lastHealthCheck?: Date) => {
  if (!lastHealthCheck) {
    return <Clock className="h-4 w-4 text-gray-400" />;
  }

  if (isHealthy) {
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  } else {
    return <XCircle className="h-4 w-4 text-red-500" />;
  }
};

export default function StorageProviderCard({
  provider,
  onEdit,
  onDelete,
  onToggleActive,
  onTestConnection,
  onHealthCheck,
}: StorageProviderCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleActive = async () => {
    setIsLoading(true);
    try {
      await onToggleActive(provider);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      await onTestConnection(provider);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHealthCheck = async () => {
    setIsLoading(true);
    try {
      await onHealthCheck(provider);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`transition-all duration-200 ${!provider.isActive ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getProviderIcon(provider.type)}
            <div>
              <CardTitle className="text-lg font-semibold">{provider.name}</CardTitle>
              <p className="text-sm text-muted-foreground capitalize">
                {provider.type.replace('_', ' ')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {getHealthStatusIcon(provider.isHealthy, provider.lastHealthCheck)}
              <Badge variant={provider.isHealthy ? 'default' : 'destructive'}>
                {provider.isHealthy ? 'Healthy' : 'Unhealthy'}
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(provider)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleTestConnection}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleHealthCheck}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Health Check
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(provider)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Description */}
          {provider.description && (
            <p className="text-sm text-muted-foreground">{provider.description}</p>
          )}

          {/* Status and Priority */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Active:</span>
                <Switch
                  checked={provider.isActive}
                  onCheckedChange={handleToggleActive}
                  disabled={isLoading}
                />
              </div>
              <Badge variant="outline">
                Priority: {provider.priority}
              </Badge>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Files Stored</p>
              <p className="text-lg font-semibold">{provider.usageCount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
              <p className="text-lg font-semibold">{formatBytes(provider.totalStorageUsed)}</p>
            </div>
          </div>

          {/* Health Check Info */}
          {provider.lastHealthCheck && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Last health check: {new Date(provider.lastHealthCheck).toLocaleString()}
              </p>
              {provider.healthCheckError && (
                <p className="text-xs text-red-500 mt-1">
                  Error: {provider.healthCheckError}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              disabled={isLoading}
              className="flex-1"
            >
              <TestTube className="h-4 w-4 mr-2" />
              Test Connection
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(provider)}
              className="flex-1"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

