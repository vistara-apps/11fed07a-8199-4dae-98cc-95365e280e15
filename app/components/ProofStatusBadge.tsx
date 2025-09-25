'use client';

import { CheckCircle, Clock, XCircle, Shield } from 'lucide-react';

interface ProofStatusBadgeProps {
  variant: 'pending' | 'verified' | 'failed';
}

export function ProofStatusBadge({ variant }: ProofStatusBadgeProps) {
  const getConfig = () => {
    switch (variant) {
      case 'verified':
        return {
          icon: CheckCircle,
          text: 'Verified',
          className: 'bg-success/20 text-success border-success/30'
        };
      case 'pending':
        return {
          icon: Clock,
          text: 'Pending',
          className: 'bg-warning/20 text-warning border-warning/30'
        };
      case 'failed':
        return {
          icon: XCircle,
          text: 'Failed',
          className: 'bg-error/20 text-error border-error/30'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      <Icon className="h-3 w-3" />
      <span>{config.text}</span>
      {variant === 'verified' && (
        <Shield className="h-3 w-3 ml-1" />
      )}
    </div>
  );
}
