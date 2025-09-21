'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus, 
  RefreshCw, 
  Settings, 
  BarChart3, 
  MessageSquare
} from 'lucide-react';
import SmsProviderCard from '@/components/admin/sms/SmsProviderCard';
import { useApi } from '@/hooks/useApi';
import { AdminService } from '@/lib/services/admin.service';

interface SmsProvider {
  id: string;
  name: string;
  providerType: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'ERROR';
  isActive: boolean;
  isEnabled: boolean;
  isHealthy: boolean;
  priority: number;
  totalSent: number;
  totalDelivered: number;
  deliveryRate: number;
  totalErrors: number;
  costPerSms?: number;
  currency: string;
  supportedCountries: string[];
  supportedFeatures: string[];
  lastHealthCheck?: Date;
  lastError?: string;
  lastUsed?: Date;
}

export default function SmsSettingsPage() {
  const [activeTab, setActiveTab] = useState('providers');

  // Fetch SMS providers
  const {
    data: providers,
    loading: providersLoading,
    error: providersError,
    refetch: refetchProviders
  } = useApi<SmsProvider[]>(
    () => AdminService.getSmsProviders(),
    [],
    { immediate: true }
  );

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await AdminService.toggleSmsProviderStatus(id, isActive);
      refetchProviders();
    } catch (error) {
      console.error('Failed to toggle provider status:', error);
    }
  };

  const handleToggleEnabled = async (id: string, isEnabled: boolean) => {
    try {
      await AdminService.updateSmsProvider(id, { isEnabled });
      refetchProviders();
    } catch (error) {
      console.error('Failed to toggle provider enabled status:', error);
    }
  };

  const handleEdit = (id: string) => {
    console.log('Edit provider:', id);
  };

  const handleHealthCheck = async (id: string) => {
    try {
      await AdminService.performSmsProviderHealthCheck(id);
      refetchProviders();
    } catch (error) {
      console.error('Health check failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this SMS provider?')) {
      try {
        await AdminService.deleteSmsProvider(id);
        refetchProviders();
      } catch (error) {
        console.error('Failed to delete provider:', error);
      }
    }
  };

  const handleUpdatePriority = async (id: string, priority: number) => {
    try {
      await AdminService.updateSmsProviderPriority(id, priority);
      refetchProviders();
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
  };

  if (providersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading SMS settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SMS Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage SMS providers, monitor delivery, and configure failover
          </p>
        </div>

        <Button onClick={() => console.log('Add provider')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Provider
        </Button>
                    </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="providers">
            <Settings className="h-4 w-4 mr-2" />
            Providers
          </TabsTrigger>
          <TabsTrigger value="statistics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="logs">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {providers && providers.map((provider) => (
              <SmsProviderCard
                key={provider.id}
                provider={provider}
                onToggleActive={handleToggleActive}
                onToggleEnabled={handleToggleEnabled}
                onEdit={handleEdit}
                onHealthCheck={handleHealthCheck}
                onDelete={handleDelete}
                onUpdatePriority={handleUpdatePriority}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>SMS Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Statistics will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>SMS Message Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Message logs will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
  );
}