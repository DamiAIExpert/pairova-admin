'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Plus, 
  Settings, 
  BarChart3, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Cloud,
  HardDrive
} from 'lucide-react';
import StorageProviderCard from '@/components/admin/storage/StorageProviderCard';
import StorageProviderForm from '@/components/admin/storage/StorageProviderForm';
import { StorageProvider } from '@/types/storage';
import { formatBytes } from '@/lib/utils';
import { useAdminService } from '@/lib/hooks/useAdmin';

export default function StorageSettingsPage() {
  const [providers, setProviders] = useState<StorageProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<StorageProvider | null>(null);
  const [storageStats, setStorageStats] = useState({
    totalFiles: 0,
    totalStorage: 0,
    providers: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { storageService } = useAdminService();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [providersData, statsData] = await Promise.all([
        storageService.getProviders(),
        storageService.getStorageStats(),
      ]);
      
      setProviders(providersData);
      setStorageStats(statsData);
    } catch (err) {
      setError('Failed to load storage data');
      console.error('Error loading storage data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProvider = async (data: any) => {
    try {
      await storageService.createProvider(data);
      setSuccessMessage('Storage provider created successfully');
      setIsDialogOpen(false);
      loadData();
    } catch (err) {
      setError('Failed to create storage provider');
      throw err;
    }
  };

  const handleUpdateProvider = async (data: any) => {
    try {
      if (!editingProvider) return;
      
      await storageService.updateProvider(editingProvider.id, data);
      setSuccessMessage('Storage provider updated successfully');
      setIsDialogOpen(false);
      setEditingProvider(null);
      loadData();
    } catch (err) {
      setError('Failed to update storage provider');
      throw err;
    }
  };

  const handleDeleteProvider = async (provider: StorageProvider) => {
    if (!confirm(`Are you sure you want to delete "${provider.name}"?`)) {
      return;
    }

    try {
      await storageService.deleteProvider(provider.id);
      setSuccessMessage('Storage provider deleted successfully');
      loadData();
    } catch (err) {
      setError('Failed to delete storage provider');
    }
  };

  const handleToggleActive = async (provider: StorageProvider) => {
    try {
      await storageService.updateProvider(provider.id, {
        isActive: !provider.isActive,
      });
      setSuccessMessage(
        `Storage provider ${provider.isActive ? 'deactivated' : 'activated'} successfully`
      );
      loadData();
    } catch (err) {
      setError('Failed to update storage provider status');
    }
  };

  const handleTestConnection = async (provider: StorageProvider) => {
    try {
      const result = await storageService.testProviderConnection(provider.id);
      setSuccessMessage(
        result.isHealthy 
          ? 'Connection test successful' 
          : `Connection test failed: ${result.error}`
      );
      loadData();
    } catch (err) {
      setError('Connection test failed');
    }
  };

  const handleHealthCheck = async (provider: StorageProvider) => {
    try {
      await storageService.performHealthCheck(provider.id);
      setSuccessMessage('Health check completed');
      loadData();
    } catch (err) {
      setError('Health check failed');
    }
  };

  const handleEditProvider = (provider: StorageProvider) => {
    setEditingProvider(provider);
    setIsDialogOpen(true);
  };

  const handleCreateNew = () => {
    setEditingProvider(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProvider(null);
  };

  const activeProviders = providers.filter(p => p.isActive && p.isHealthy);
  const inactiveProviders = providers.filter(p => !p.isActive || !p.isHealthy);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Storage Management</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Storage Management</h1>
          <p className="text-muted-foreground">
            Manage file storage providers and monitor usage
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={loadData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Storage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageStats.totalFiles.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(storageStats.totalStorage)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProviders.length}</div>
            <p className="text-xs text-muted-foreground">
              of {providers.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unhealthy Providers</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveProviders.length}</div>
            <p className="text-xs text-muted-foreground">
              need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Providers */}
      {activeProviders.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold">Active Providers</h2>
            <Badge variant="default">{activeProviders.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProviders.map((provider) => (
              <StorageProviderCard
                key={provider.id}
                provider={provider}
                onEdit={handleEditProvider}
                onDelete={handleDeleteProvider}
                onToggleActive={handleToggleActive}
                onTestConnection={handleTestConnection}
                onHealthCheck={handleHealthCheck}
              />
            ))}
          </div>
        </div>
      )}

      {/* Inactive/Unhealthy Providers */}
      {inactiveProviders.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold">Inactive Providers</h2>
            <Badge variant="secondary">{inactiveProviders.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inactiveProviders.map((provider) => (
              <StorageProviderCard
                key={provider.id}
                provider={provider}
                onEdit={handleEditProvider}
                onDelete={handleDeleteProvider}
                onToggleActive={handleToggleActive}
                onTestConnection={handleTestConnection}
                onHealthCheck={handleHealthCheck}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {providers.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Cloud className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Storage Providers</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first storage provider
            </p>
            <Button onClick={handleCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add Storage Provider
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Provider Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProvider ? 'Edit Storage Provider' : 'Add New Storage Provider'}
            </DialogTitle>
            <DialogDescription>
              Configure a new storage provider for file uploads
            </DialogDescription>
          </DialogHeader>
          <StorageProviderForm
            provider={editingProvider || undefined}
            onSubmit={editingProvider ? handleUpdateProvider : handleCreateProvider}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
