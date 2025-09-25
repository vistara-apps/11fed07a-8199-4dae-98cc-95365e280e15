'use client';

import { useState } from 'react';
import { Bot, Zap, Shield } from 'lucide-react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';

interface AgentConnectButtonProps {
  variant?: 'default';
}

export function AgentConnectButton({ variant = 'default' }: AgentConnectButtonProps) {
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeployAgent = async () => {
    setIsDeploying(true);
    // Simulate agent deployment
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDeploying(false);
  };

  return (
    <div className="glass-card p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-accent/20 rounded-full">
          <Bot className="h-8 w-8 text-accent" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-textPrimary mb-2">
        Deploy Your Agent Account
      </h3>
      
      <p className="text-textSecondary mb-6">
        Create a gasless smart account powered by 0xGasless AgentKit for seamless transactions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col items-center space-y-2">
          <Zap className="h-5 w-5 text-accent" />
          <span className="text-sm text-textSecondary">Gasless</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Shield className="h-5 w-5 text-accent" />
          <span className="text-sm text-textSecondary">Secure</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Bot className="h-5 w-5 text-accent" />
          <span className="text-sm text-textSecondary">Automated</span>
        </div>
      </div>

      <ConnectWallet>
        <button
          onClick={handleDeployAgent}
          disabled={isDeploying}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeploying ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
              <span>Deploying Agent...</span>
            </div>
          ) : (
            'Deploy Agent Account'
          )}
        </button>
      </ConnectWallet>
    </div>
  );
}
