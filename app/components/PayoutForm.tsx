'use client';

import { useState } from 'react';
import { Plus, Trash2, Calendar, DollarSign, Users } from 'lucide-react';

interface Recipient {
  address: string;
  percentage: number;
}

interface PayoutFormProps {
  variant: 'streaming' | 'burst';
  onSubmit?: (data: any) => void;
}

export function PayoutForm({ variant, onSubmit }: PayoutFormProps) {
  const [recipients, setRecipients] = useState<Recipient[]>([
    { address: '', percentage: 100 }
  ]);
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('weekly');
  const [startDate, setStartDate] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalPercentage !== 100) {
      alert('Total percentage must equal 100%');
      return;
    }
    
    const formData = {
      type: variant,
      amount: parseFloat(amount),
      recipients,
      frequency: variant === 'streaming' ? frequency : undefined,
      startDate: variant === 'streaming' ? startDate : undefined,
    };
    
    onSubmit?.(formData);
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
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={totalPercentage !== 100}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {variant === 'streaming' ? 'Start Streaming' : 'Execute Payout'}
          </button>
        </div>
      </form>
    </div>
  );
}
