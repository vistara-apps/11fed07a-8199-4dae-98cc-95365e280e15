'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { usePayment } from '../../lib/hooks/usePayment';
import { TransactionStatus as TxStatus } from '../../lib/payment-service';

interface TransactionStatusProps {
  txHash: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function TransactionStatus({ 
  txHash, 
  autoRefresh = true, 
  refreshInterval = 5000 
}: TransactionStatusProps) {
  const { checkTransactionStatus } = usePayment();
  const [status, setStatus] = useState<TxStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    if (!txHash) return;

    try {
      setIsLoading(true);
      setError(null);
      const txStatus = await checkTransactionStatus(txHash);
      setStatus(txStatus);
    } catch (err) {
      console.error('Failed to fetch transaction status:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch status');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStatus();
  }, [txHash]);

  // Auto-refresh for pending transactions
  useEffect(() => {
    if (!autoRefresh || !status || status.status !== 'pending') {
      return;
    }

    const interval = setInterval(fetchStatus, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, status?.status]);

  const getStatusIcon = () => {
    if (isLoading) {
      return <RefreshCw className="h-5 w-5 text-textSecondary animate-spin" />;
    }

    switch (status?.status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-error" />;
      default:
        return <Clock className="h-5 w-5 text-textSecondary" />;
    }
  };

  const getStatusText = () => {
    if (error) return 'Error fetching status';
    if (isLoading && !status) return 'Checking status...';

    switch (status?.status) {
      case 'confirmed':
        return `Confirmed (${status.confirmations} confirmations)`;
      case 'pending':
        return `Pending (${status.confirmations} confirmations)`;
      case 'failed':
        return 'Transaction failed';
      default:
        return 'Unknown status';
    }
  };

  const getStatusColor = () => {
    if (error) return 'text-error';
    
    switch (status?.status) {
      case 'confirmed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-textSecondary';
    }
  };

  const formatTxHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  return (
    <div className="bg-surface/50 rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-textPrimary">Transaction Status</h4>
        {!isLoading && (
          <button
            onClick={fetchStatus}
            className="text-textSecondary hover:text-textPrimary transition-colors"
            title="Refresh status"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* Transaction Hash */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-textSecondary">Transaction:</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm text-textPrimary">
              {formatTxHash(txHash)}
            </span>
            <a
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
              title="View on Basescan"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-textSecondary">Status:</span>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>

        {/* Block Number */}
        {status?.blockNumber && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-textSecondary">Block:</span>
            <span className="text-sm font-mono text-textPrimary">
              #{status.blockNumber.toLocaleString()}
            </span>
          </div>
        )}

        {/* Progress Bar for Confirmations */}
        {status?.status === 'pending' && status.confirmations > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-textSecondary">
              <span>Confirmations</span>
              <span>{status.confirmations}/12</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div
                className="bg-warning h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((status.confirmations / 12) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Confirmation Complete */}
        {status?.status === 'confirmed' && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-success">
              <span>Fully Confirmed</span>
              <span>✓ {status.confirmations} confirmations</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div className="bg-success h-2 rounded-full w-full" />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-xs text-error bg-error/10 p-2 rounded border border-error/20">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}