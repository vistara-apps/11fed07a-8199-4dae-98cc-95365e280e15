'use client';

import { useEffect, useState, useCallback } from 'react';
import { useWalletClient, useAccount } from 'wagmi';
import { paymentService, PaymentService, PaymentConfig, PaymentResult, TransactionStatus } from '../payment-service';

export interface UsePaymentReturn {
  // State
  isConnected: boolean;
  isLoading: boolean;
  balance: bigint;
  
  // Actions
  executePayment: (config: PaymentConfig) => Promise<PaymentResult>;
  checkTransactionStatus: (txHash: string) => Promise<TransactionStatus>;
  refreshBalance: () => Promise<void>;
  
  // Utilities
  formatBalance: () => string;
}

export function usePayment(): UsePaymentReturn {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<bigint>(0n);

  // Update payment service with wallet client
  useEffect(() => {
    paymentService.setWalletClient(walletClient || null);
  }, [walletClient]);

  // Load balance when wallet connects
  const refreshBalance = useCallback(async () => {
    if (!address || !isConnected) {
      setBalance(0n);
      return;
    }

    try {
      setIsLoading(true);
      const newBalance = await paymentService.getUSDCBalance(address);
      setBalance(newBalance);
    } catch (error) {
      console.error('Failed to fetch USDC balance:', error);
      setBalance(0n);
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected]);

  // Load balance on mount and when address changes
  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  // Execute payment
  const executePayment = useCallback(async (config: PaymentConfig): Promise<PaymentResult> => {
    if (!isConnected || !walletClient) {
      return {
        success: false,
        error: 'Wallet not connected',
        timestamp: Date.now(),
      };
    }

    setIsLoading(true);
    try {
      const result = await paymentService.executePayment(config);
      
      // Refresh balance after payment
      if (result.success) {
        await refreshBalance();
      }
      
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, walletClient, refreshBalance]);

  // Check transaction status
  const checkTransactionStatus = useCallback(async (txHash: string): Promise<TransactionStatus> => {
    return await paymentService.getTransactionStatus(txHash);
  }, []);

  // Format balance for display
  const formatBalance = useCallback(() => {
    return PaymentService.formatUSDC(balance);
  }, [balance]);

  return {
    // State
    isConnected,
    isLoading,
    balance,
    
    // Actions
    executePayment,
    checkTransactionStatus,
    refreshBalance,
    
    // Utilities
    formatBalance,
  };
}