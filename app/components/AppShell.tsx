'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Send, 
  History, 
  Settings2, 
  Menu, 
  X,
  Wallet,
  TrendingUp
} from 'lucide-react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, current: true },
    { name: 'Create Payout', href: '/create', icon: Send, current: false },
    { name: 'History', href: '/history', icon: History, current: false },
    { name: 'Settings', href: '/settings', icon: Settings2, current: false },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-surface border-r border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold text-textPrimary">Splitsync</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-textSecondary hover:text-textPrimary"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-8 px-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-accent/20 text-accent'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-surface/50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
        <div className="flex flex-col h-full bg-surface border-r border-border">
          <div className="flex items-center space-x-2 p-6">
            <TrendingUp className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-textPrimary">Splitsync</span>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-accent/20 text-accent'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-surface/50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <ConnectWallet>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface/50">
                <Avatar className="h-8 w-8" />
                <div className="flex-1 min-w-0">
                  <Name className="text-sm font-medium text-textPrimary" />
                </div>
                <Wallet className="h-4 w-4 text-textSecondary" />
              </div>
            </ConnectWallet>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-bg/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-textSecondary hover:text-textPrimary"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1 lg:hidden" />
            <div className="hidden lg:block">
              <ConnectWallet>
                <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-surface/50 hover:bg-surface/70 transition-colors">
                  <Avatar className="h-6 w-6" />
                  <Name className="text-sm font-medium text-textPrimary" />
                </div>
              </ConnectWallet>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className={variant === 'compact' ? 'p-4' : 'p-6'}>
          {children}
        </main>
      </div>
    </div>
  );
}
