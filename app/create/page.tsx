'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { PayoutForm } from '../components/PayoutForm';
import { Send, Calendar, ArrowLeft } from 'lucide-react';

export default function CreatePayout() {
  const [payoutType, setPayoutType] = useState<'streaming' | 'burst' | null>(null);

  const handleFormSubmit = (data: any) => {
    console.log('Payout data:', data);
    // Here you would integrate with the actual payout system
    alert('Payout created successfully!');
  };

  const resetForm = () => {
    setPayoutType(null);
  };

  if (!payoutType) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-textPrimary mb-2">Create Payout</h1>
            <p className="text-textSecondary">
              Choose your payout type to get started with automated USDC distributions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Burst Payout Option */}
            <button
              onClick={() => setPayoutType('burst')}
              className="glass-card p-8 rounded-lg text-left hover:bg-surface/90 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                  <Send className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-textPrimary">Burst Payout</h3>
                  <p className="text-textSecondary">One-time distribution</p>
                </div>
              </div>
              
              <p className="text-textSecondary mb-6">
                Execute immediate payments to multiple recipients with custom split ratios. 
                Perfect for project completions, bounty distributions, or one-off payments.
              </p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-textSecondary">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  Instant execution
                </div>
                <div className="flex items-center text-sm text-textSecondary">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  Custom split percentages
                </div>
                <div className="flex items-center text-sm text-textSecondary">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  Verifiable proofs
                </div>
              </div>
            </button>

            {/* Streaming Payout Option */}
            <button
              onClick={() => setPayoutType('streaming')}
              className="glass-card p-8 rounded-lg text-left hover:bg-surface/90 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-textPrimary">Streaming Payout</h3>
                  <p className="text-textSecondary">Recurring distribution</p>
                </div>
              </div>
              
              <p className="text-textSecondary mb-6">
                Set up automated recurring payments with flexible scheduling. 
                Ideal for salaries, subscription payments, or ongoing revenue sharing.
              </p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-textSecondary">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Automated scheduling
                </div>
                <div className="flex items-center text-sm text-textSecondary">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Flexible frequency
                </div>
                <div className="flex items-center text-sm text-textSecondary">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Continuous verification
                </div>
              </div>
            </button>
          </div>

          {/* Feature Comparison */}
          <div className="mt-12 glass-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Feature Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-textSecondary font-medium">Feature</th>
                    <th className="text-center py-3 text-textSecondary font-medium">Burst</th>
                    <th className="text-center py-3 text-textSecondary font-medium">Streaming</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  <tr>
                    <td className="py-3 text-textPrimary">Execution</td>
                    <td className="py-3 text-center text-accent">Immediate</td>
                    <td className="py-3 text-center text-primary">Scheduled</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-textPrimary">Gas Optimization</td>
                    <td className="py-3 text-center text-success">✓</td>
                    <td className="py-3 text-center text-success">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-textPrimary">Proof Generation</td>
                    <td className="py-3 text-center text-success">✓</td>
                    <td className="py-3 text-center text-success">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-textPrimary">Multiple Recipients</td>
                    <td className="py-3 text-center text-success">✓</td>
                    <td className="py-3 text-center text-success">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-textPrimary">Recurring Payments</td>
                    <td className="py-3 text-center text-textSecondary">-</td>
                    <td className="py-3 text-center text-success">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={resetForm}
            className="p-2 text-textSecondary hover:text-textPrimary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">
              {payoutType === 'streaming' ? 'Streaming Payout' : 'Burst Payout'}
            </h1>
            <p className="text-textSecondary">
              Configure your {payoutType === 'streaming' ? 'recurring' : 'one-time'} USDC distribution
            </p>
          </div>
        </div>

        <PayoutForm variant={payoutType} onSubmit={handleFormSubmit} />
      </div>
    </AppShell>
  );
}
