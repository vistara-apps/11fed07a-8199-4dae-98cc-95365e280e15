'use client';

import { useTheme } from '../components/ThemeProvider';
import { AppShell } from '../components/AppShell';
import { PayoutForm } from '../components/PayoutForm';
import { TransactionTable } from '../components/TransactionTable';
import { ProofStatusBadge } from '../components/ProofStatusBadge';
import { Palette, Check } from 'lucide-react';

const themes = [
  { id: 'default', name: 'Finance Pro', description: 'Professional dark navy with gold accents' },
  { id: 'celo', name: 'Celo', description: 'Black background with yellow highlights' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
  { id: 'base', name: 'Base', description: 'Base blue with clean design' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue' },
] as const;

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell variant="compact">
      <div className="space-y-8">
        {/* Theme Selector */}
        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-bold text-textPrimary">Theme Preview</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  theme === themeOption.id
                    ? 'border-accent bg-accent/10'
                    : 'border-border bg-surface/50 hover:bg-surface/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-textPrimary">{themeOption.name}</h3>
                  {theme === themeOption.id && (
                    <Check className="h-5 w-5 text-accent" />
                  )}
                </div>
                <p className="text-sm text-textSecondary">{themeOption.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buttons and Badges */}
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Buttons & Badges</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <ProofStatusBadge variant="verified" />
                <ProofStatusBadge variant="pending" />
                <ProofStatusBadge variant="failed" />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
                  BURST
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                  STREAMING
                </span>
              </div>
            </div>
          </div>

          {/* Form Elements */}
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Form Elements</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Sample input field"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
              />
              
              <select className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent">
                <option>Sample select option</option>
                <option>Another option</option>
              </select>
              
              <textarea
                placeholder="Sample textarea"
                rows={3}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Payouts', value: '$125,000', change: '+12.5%' },
            { title: 'Active Streams', value: '8', change: '+2' },
            { title: 'Recipients', value: '42', change: '+8' },
            { title: 'Success Rate', value: '99.8%', change: '+0.2%' },
          ].map((metric, index) => (
            <div key={metric.title} className="metric-card">
              <div>
                <p className="text-textSecondary text-sm font-medium">{metric.title}</p>
                <p className="text-2xl font-bold text-textPrimary mt-1">{metric.value}</p>
                <p className="text-success text-sm mt-2">{metric.change} vs last month</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sample Transaction Table */}
        <TransactionTable />

        {/* Typography Scale */}
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Typography</h3>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-textPrimary">Heading 1</h1>
            <h2 className="text-3xl font-bold text-textPrimary">Heading 2</h2>
            <h3 className="text-2xl font-semibold text-textPrimary">Heading 3</h3>
            <h4 className="text-xl font-semibold text-textPrimary">Heading 4</h4>
            <p className="text-base text-textPrimary">
              This is body text in the primary color. It should be easily readable against the background.
            </p>
            <p className="text-base text-textSecondary">
              This is secondary text used for descriptions and less important information.
            </p>
            <p className="text-sm text-textSecondary">
              This is small text used for captions and fine print.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
