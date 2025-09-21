'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  MoreVertical, 
  Settings, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Globe,
  Zap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SmsProviderCardProps {
  provider: {
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
  };
  onToggleActive: (id: string, isActive: boolean) => void;
  onToggleEnabled: (id: string, isEnabled: boolean) => void;
  onEdit: (id: string) => void;
  onHealthCheck: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdatePriority: (id: string, priority: number) => void;
}

const SmsProviderCard: React.FC<SmsProviderCardProps> = ({
  provider,
  onToggleActive,
  onToggleEnabled,
  onEdit,
  onHealthCheck,
  onDelete,
  onUpdatePriority,
}) => {
  const getStatusIcon = () => {
    if (!provider.isHealthy) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    
    switch (provider.status) {
      case 'ACTIVE':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'MAINTENANCE':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'ERROR':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    if (!provider.isHealthy) return 'destructive';
    
    switch (provider.status) {
      case 'ACTIVE':
        return 'default';
      case 'MAINTENANCE':
        return 'secondary';
      case 'ERROR':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatLastHealthCheck = () => {
    if (!provider.lastHealthCheck) return 'Never';
    
    const now = new Date();
    const diff = now.getTime() - new Date(provider.lastHealthCheck).getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <div>
              <CardTitle className="text-lg">{provider.name}</CardTitle>
              <p className="text-sm text-gray-600 capitalize">
                {provider.providerType.toLowerCase().replace('_', ' ')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={getStatusColor()}>
              {provider.status.toLowerCase()}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(provider.id)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Configuration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onHealthCheck(provider.id)}>
                  <Activity className="h-4 w-4 mr-2" />
                  Health Check
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(provider.id)}
                  className="text-red-600"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Delete Provider
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={provider.isActive}
                onCheckedChange={(checked) => onToggleActive(provider.id, checked)}
                disabled={!provider.isEnabled}
              />
              <span className="text-sm font-medium">Active</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={provider.isEnabled}
                onCheckedChange={(checked) => onToggleEnabled(provider.id, checked)}
              />
              <span className="text-sm font-medium">Enabled</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Priority:</span>
            <Badge variant="outline">{provider.priority}</Badge>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">{provider.totalSent.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Total Sent</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">{provider.deliveryRate.toFixed(1)}%</p>
              <p className="text-xs text-gray-600">Delivery Rate</p>
            </div>
          </div>
          
          {provider.costPerSms && (
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">
                  {provider.costPerSms.toFixed(4)} {provider.currency}
                </p>
                <p className="text-xs text-gray-600">Cost per SMS</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-sm font-medium">{provider.totalErrors}</p>
              <p className="text-xs text-gray-600">Errors</p>
            </div>
          </div>
        </div>

        {/* Features */}
        {provider.supportedFeatures.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Supported Features</p>
            <div className="flex flex-wrap gap-1">
              {provider.supportedFeatures.map((feature) => (
                <Badge key={feature} variant="secondary" className="text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  {feature.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Countries */}
        {provider.supportedCountries.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Supported Countries</p>
            <div className="flex flex-wrap gap-1">
              {provider.supportedCountries.slice(0, 5).map((country) => (
                <Badge key={country} variant="outline" className="text-xs">
                  <Globe className="h-3 w-3 mr-1" />
                  {country}
                </Badge>
              ))}
              {provider.supportedCountries.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{provider.supportedCountries.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Health Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">
              Last health check: {formatLastHealthCheck()}
            </span>
          </div>
          
          {provider.lastUsed && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">
                Last used: {new Date(provider.lastUsed).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {provider.lastError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Last Error</p>
                <p className="text-sm text-red-700">{provider.lastError}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmsProviderCard;
