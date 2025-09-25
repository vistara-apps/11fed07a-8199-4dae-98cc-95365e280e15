'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { TransactionTable } from '../components/TransactionTable';
import { ProofStatusBadge } from '../components/ProofStatusBadge';
import { 
  Filter, 
  Download, 
  Search, 
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  Activity
} from 'lucide-react';

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  const summaryStats = [
    {
      label: 'Total Volume',
      value: '$125,000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-accent'
    },
    {
      label: 'Transactions',
      value: '47',
      change: '+8',
      icon: Activity,
      color: 'text-primary'
    },
    {
      label: 'Recipients',
      value: '42',
      change: '+5',
      icon: Users,
      color: 'text-success'
    },
    {
      label: 'Success Rate',
      value: '98.9%',
      change: '+0.2%',
      icon: TrendingUp,
      color: 'text-accent'
    }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">Transaction History</h1>
            <p className="text-textSecondary mt-1">
              View and analyze all your payout transactions and proofs
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="btn-primary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Advanced Filter</span>
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryStats.map((stat, index) => (
            <div key={stat.label} className="metric-card animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-textPrimary mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 bg-surface/50 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-success text-sm font-medium">{stat.change}</span>
                <span className="text-textSecondary text-sm ml-1">vs last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textSecondary" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-surface border border-border rounded-lg text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            >
              <option value="all">All Types</option>
              <option value="burst">Burst Payouts</option>
              <option value="streaming">Streaming Payouts</option>
            </select>

            {/* Date Range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-surface border border-border rounded-lg text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            {/* Status Filter */}
            <select
              className="px-4 py-2 bg-surface border border-border rounded-lg text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Transaction Table */}
        <TransactionTable />

        {/* Proof Verification Section */}
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Proof Verification Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <ProofStatusBadge variant="verified" />
              </div>
              <p className="text-2xl font-bold text-textPrimary">42</p>
              <p className="text-textSecondary text-sm">Verified Proofs</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <ProofStatusBadge variant="pending" />
              </div>
              <p className="text-2xl font-bold text-textPrimary">3</p>
              <p className="text-textSecondary text-sm">Pending Verification</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <ProofStatusBadge variant="failed" />
              </div>
              <p className="text-2xl font-bold text-textPrimary">1</p>
              <p className="text-textSecondary text-sm">Failed Proofs</p>
            </div>
          </div>
        </div>

        {/* Analytics Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Payment Trends</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Average Payout Size</span>
                <span className="text-textPrimary font-medium">$2,659</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Most Active Day</span>
                <span className="text-textPrimary font-medium">Friday</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Peak Hour</span>
                <span className="text-textPrimary font-medium">2:00 PM UTC</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Gas Saved</span>
                <span className="text-success font-medium">$1,247</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Recipient Analysis</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Unique Recipients</span>
                <span className="text-textPrimary font-medium">42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Repeat Recipients</span>
                <span className="text-textPrimary font-medium">28 (67%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Largest Single Payout</span>
                <span className="text-textPrimary font-medium">$15,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Average Recipients/Tx</span>
                <span className="text-textPrimary font-medium">3.2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
