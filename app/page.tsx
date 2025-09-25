'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { AgentConnectButton } from './components/AgentConnectButton';
import { TransactionTable } from './components/TransactionTable';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';

interface DashboardMetrics {
  totalPayouts: number;
  activeStreams: number;
  totalRecipients: number;
  proofVerification: number;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalPayouts: 0,
    activeStreams: 0,
    totalRecipients: 0,
    proofVerification: 0
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate loading metrics
    const timer = setTimeout(() => {
      setMetrics({
        totalPayouts: 125000,
        activeStreams: 8,
        totalRecipients: 42,
        proofVerification: 99.8
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const metricCards = [
    {
      title: 'Total Payouts',
      value: `$${metrics.totalPayouts.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'USDC distributed'
    },
    {
      title: 'Active Streams',
      value: metrics.activeStreams.toString(),
      change: '+2',
      changeType: 'positive' as const,
      icon: Activity,
      description: 'Ongoing payments'
    },
    {
      title: 'Recipients',
      value: metrics.totalRecipients.toString(),
      change: '+8',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Unique addresses'
    },
    {
      title: 'Proof Verification',
      value: `${metrics.proofVerification}%`,
      change: '+0.2%',
      changeType: 'positive' as const,
      icon: Shield,
      description: 'Success rate'
    }
  ];

  if (!isConnected) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-textPrimary mb-4">
              Welcome to <span className="text-accent">Splitsync Agent</span>
            </h1>
            <p className="text-lg text-textSecondary">
              Seamless, automated, and provable stablecoin payouts for creators and DAOs.
            </p>
          </div>
          
          <AgentConnectButton />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-accent/10 rounded-lg mb-3">
                <DollarSign className="h-8 w-8 text-accent mx-auto" />
              </div>
              <h3 className="font-semibold text-textPrimary mb-2">Programmable Payouts</h3>
              <p className="text-sm text-textSecondary">
                Set up burst or streaming USDC payments with custom schedules
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-accent/10 rounded-lg mb-3">
                <Users className="h-8 w-8 text-accent mx-auto" />
              </div>
              <h3 className="font-semibold text-textPrimary mb-2">Automated Splitting</h3>
              <p className="text-sm text-textSecondary">
                Distribute funds to multiple recipients with configurable ratios
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-accent/10 rounded-lg mb-3">
                <Shield className="h-8 w-8 text-accent mx-auto" />
              </div>
              <h3 className="font-semibold text-textPrimary mb-2">Verifiable Proofs</h3>
              <p className="text-sm text-textSecondary">
                Multi-layered transaction proofs for complete transparency
              </p>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">Dashboard</h1>
            <p className="text-textSecondary mt-1">
              Monitor your payouts and manage distributions
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button className="btn-secondary">
              View Analytics
            </button>
            <button className="btn-primary">
              Create Payout
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((metric, index) => (
            <div key={metric.title} className="metric-card animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm font-medium">{metric.title}</p>
                  <p className="text-2xl font-bold text-textPrimary mt-1">{metric.value}</p>
                  <p className="text-xs text-textSecondary mt-1">{metric.description}</p>
                </div>
                <div className="p-3 bg-accent/20 rounded-lg">
                  <metric.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {metric.changeType === 'positive' ? (
                  <ArrowUpRight className="h-4 w-4 text-success" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-error" />
                )}
                <span className={`text-sm font-medium ml-1 ${
                  metric.changeType === 'positive' ? 'text-success' : 'text-error'
                }`}>
                  {metric.change}
                </span>
                <span className="text-textSecondary text-sm ml-1">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionTable />
          </div>
          
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-textPrimary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-surface/50 hover:bg-surface/70 transition-colors">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium text-textPrimary">Create Burst Payout</p>
                      <p className="text-sm text-textSecondary">One-time payment distribution</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg bg-surface/50 hover:bg-surface/70 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium text-textPrimary">Setup Streaming</p>
                      <p className="text-sm text-textSecondary">Recurring payment schedule</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg bg-surface/50 hover:bg-surface/70 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium text-textPrimary">Verify Proofs</p>
                      <p className="text-sm text-textSecondary">Check transaction integrity</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-textPrimary mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-textSecondary">Base Network</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse-gold"></div>
                    <span className="text-success text-sm">Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-textSecondary">Agent Kit</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse-gold"></div>
                    <span className="text-success text-sm">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-textSecondary">Proof System</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse-gold"></div>
                    <span className="text-success text-sm">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
