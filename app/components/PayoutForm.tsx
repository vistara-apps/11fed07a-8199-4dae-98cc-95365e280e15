'use client';

import { useState } from 'react';
import { Plus, Trash2, Calendar, DollarSign, Users, Wallet, CheckCircle, AlertTriangle } from 'lucide-react';
import { usePayment } from '../../lib/hooks/usePayment';
import { PaymentService } from '../../lib/payment-service';

interface Recipient {
  address: string;
  percentage: number;
}

interface PayoutFormProps {
  variant: 'streaming' | 'burst';
  onSubmit?: (data: any) => void;
}

export function PayoutForm({ variant, onSubmit }: PayoutFormProps) {
  const { 
    isConnected, 
    isLoading, 
    balance, 
    executePayment, 
    formatBalance 
  } = usePayment();

  const [recipients, setRecipients] = useState<Recipient[]>([
    { address: '', percentage: 100 }
  ]);
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('weekly');
  const [startDate, setStartDate] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    success: boolean;
    message: string;
    txHash?: string;
  } | null>(null);

  const addRecipient = () => {
    setRecipients([...recipients, { address: '', percentage: 0 }]);
  };

  const removeRecipient = (index: number) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((_, i) => i !== index));
    }
  };

  const updateRecipient = (index: number, field: keyof Recipient, value: string | number) => {
    const updated = recipients.map((recipient, i) => 
      i === index ? { ...recipient, [field]: value } : recipient
    );
    setRecipients(updated);
  };

  const totalPercentage = recipients.reduce((sum, r) => sum + r.percentage, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      setExecutionResult({
        success: false,
        message: 'Please connect your wallet to execute payments',
      });
      return;
    }

    if (totalPercentage !== 100) {
      setExecutionResult({
        success: false,
        message: 'Total percentage must equal 100%',
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setExecutionResult({
        success: false,
        message: 'Please enter a valid amount',
      });
      return;
    }

    try {
      setIsExecuting(true);
      setExecutionResult(null);

      // Parse the amount to USDC format (6 decimals)
      const paymentAmount = PaymentService.parseUSDC(amount);

      // Check if user has sufficient balance
      if (paymentAmount > balance) {
        setExecutionResult({
          success: false,
          message: `Insufficient balance. You have ${formatBalance()} USDC, but need ${amount} USDC`,
        });
        return;
      }

      const result = await executePayment({
        amount: paymentAmount,
        recipients,
        memo: `${variant} payout - ${recipients.length} recipients`,
      });

      if (result.success) {
        setExecutionResult({
          success: true,
          message: 'Payment executed successfully!',
          txHash: result.transactionHash,
        });

        // Call the original onSubmit callback
        const formData = {
          type: variant,
          amount: parseFloat(amount),
          recipients,
          frequency: variant === 'streaming' ? frequency : undefined,
          startDate: variant === 'streaming' ? startDate : undefined,
          transactionHash: result.transactionHash,
        };
        
        onSubmit?.(formData);

        // Reset form on success
        setAmount('');
        setRecipients([{ address: '', percentage: 100 }]);
        setFrequency('weekly');
        setStartDate('');
      } else {
        setExecutionResult({
          success: false,
          message: result.error || 'Payment failed',
        });
      }
    } catch (error) {
      console.error('Payment execution error:', error);
      setExecutionResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center space-x-3 mb-6">
        {variant === 'streaming' ? (
          <Calendar className="h-6 w-6 text-accent" />
        ) : (
          <DollarSign className="h-6 w-6 text-accent" />
        )}
        <h2 className="text-xl font-semibold text-textPrimary">
          {variant === 'streaming' ? 'Streaming Payout' : 'Burst Payout'}
        </h2>
      </div>

      {/* Wallet Status and Balance */}
      {isConnected && (
        <div className="mb-6 p-4 bg-surface/50 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-textPrimary">Connected Wallet</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-textSecondary">USDC Balance</div>
              <div className="font-semibold text-textPrimary">
                {isLoading ? 'Loading...' : `${formatBalance()} USDC`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Execution Result */}
      {executionResult && (
        <div className={`mb-6 p-4 rounded-lg border ${
          executionResult.success 
            ? 'bg-success/10 border-success/20 text-success' 
            : 'bg-error/10 border-error/20 text-error'
        }`}>
          <div className="flex items-start space-x-2">
            {executionResult.success ? (
              <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="font-medium">{executionResult.message}</p>
              {executionResult.txHash && (
                <p className="text-sm mt-1 break-all">
                  Transaction: <span className="font-mono">{executionResult.txHash}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-2">
            {variant === 'streaming' ? 'Total Amount to Stream' : 'Payout Amount'}
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-textSecondary" />
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
              placeholder="0.00 USDC"
              required
              disabled={isExecuting}
            />
          </div>
        </div>

        {/* Streaming Options */}
        {variant === 'streaming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Start Date
              </label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                required
              />
            </div>
          </div>
        )}

        {/* Recipients */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center space-x-2 text-sm font-medium text-textSecondary">
              <Users className="h-4 w-4" />
              <span>Recipients</span>
            </label>
            <button
              type="button"
              onClick={addRecipient}
              className="flex items-center space-x-1 text-accent hover:text-accent/80 text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add Recipient</span>
            </button>
          </div>

          <div className="space-y-3">
            {recipients.map((recipient, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={recipient.address}
                    onChange={(e) => updateRecipient(index, 'address', e.target.value)}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    placeholder="0x... recipient address"
                    required
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={recipient.percentage}
                    onChange={(e) => updateRecipient(index, 'percentage', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-3 bg-surface border border-border rounded-lg text-textPrimary text-center focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    placeholder="0"
                    required
                  />
                </div>
                <span className="text-textSecondary text-sm">%</span>
                {recipients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRecipient(index)}
                    className="text-error hover:text-error/80 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Total Percentage Display */}
          <div className="mt-3 flex justify-end">
            <div className={`text-sm font-medium ${
              totalPercentage === 100 ? 'text-success' : 'text-warning'
            }`}>
              Total: {totalPercentage}%
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="btn-secondary"
            disabled={isExecuting}
            onClick={() => {
              setAmount('');
              setRecipients([{ address: '', percentage: 100 }]);
              setFrequency('weekly');
              setStartDate('');
              setExecutionResult(null);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isConnected || totalPercentage !== 100 || isExecuting || isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isExecuting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                <span>Processing...</span>
              </>
            ) : !isConnected ? (
              'Connect Wallet'
            ) : (
              variant === 'streaming' ? 'Start Streaming' : 'Execute Payout'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
