import axios, { AxiosInstance } from 'axios';
import { WalletClient } from 'viem';
import { USDC_BASE_CONTRACT } from './constants';

export interface PaymentConfig {
  amount: bigint;
  recipients: Array<{
    address: string;
    percentage: number;
  }>;
  memo?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  timestamp: number;
}

export interface TransactionStatus {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations: number;
  blockNumber?: number;
}

export class PaymentService {
  private axiosInstance: AxiosInstance;
  private walletClient: WalletClient | null = null;

  constructor() {
    // Create axios instance and configure x402
    this.axiosInstance = axios.create({
      timeout: 30000, // 30 second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Initialize x402 payment handling
    // Note: x402-axios will be properly integrated when available
    // For now we're simulating the payment flow
  }

  /**
   * Set the wallet client for payment operations
   */
  setWalletClient(walletClient: WalletClient | null) {
    this.walletClient = walletClient;
  }

  /**
   * Validate payment configuration
   */
  private validatePaymentConfig(config: PaymentConfig): string[] {
    const errors: string[] = [];

    if (config.amount <= 0n) {
      errors.push('Payment amount must be greater than 0');
    }

    if (!config.recipients || config.recipients.length === 0) {
      errors.push('At least one recipient is required');
    }

    // Validate recipients
    for (const recipient of config.recipients) {
      if (!recipient.address || !/^0x[a-fA-F0-9]{40}$/.test(recipient.address)) {
        errors.push(`Invalid recipient address: ${recipient.address}`);
      }
      if (recipient.percentage <= 0 || recipient.percentage > 100) {
        errors.push(`Invalid percentage for ${recipient.address}: ${recipient.percentage}%`);
      }
    }

    // Check total percentage
    const totalPercentage = config.recipients.reduce((sum, r) => sum + r.percentage, 0);
    if (Math.abs(totalPercentage - 100) > 0.01) {
      errors.push(`Total percentage must equal 100%, got ${totalPercentage}%`);
    }

    return errors;
  }

  /**
   * Execute a payment using x402 flow
   */
  async executePayment(config: PaymentConfig): Promise<PaymentResult> {
    const startTime = Date.now();

    try {
      // Validate input
      const validationErrors = this.validatePaymentConfig(config);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      if (!this.walletClient) {
        throw new Error('Wallet client not connected');
      }

      // Calculate individual amounts
      const recipients = config.recipients.map(recipient => ({
        address: recipient.address as `0x${string}`,
        amount: (config.amount * BigInt(Math.round(recipient.percentage * 100))) / 10000n,
        percentage: recipient.percentage,
      }));

      // Simulate x402 payment request (in real implementation, this would call payment endpoint)
      const paymentRequest = {
        contract: USDC_BASE_CONTRACT,
        recipients,
        totalAmount: config.amount.toString(),
        memo: config.memo || 'Splitsync Agent Payment',
        timestamp: startTime,
      };

      console.log('Executing payment with x402:', paymentRequest);

      // In a real implementation, this would make an actual payment request
      // For now, we'll simulate the payment flow
      const response = await this.simulateX402Payment(paymentRequest);

      return {
        success: true,
        transactionHash: response.transactionHash,
        timestamp: startTime,
      };

    } catch (error) {
      console.error('Payment execution failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown payment error',
        timestamp: startTime,
      };
    }
  }

  /**
   * Simulate x402 payment for demonstration purposes
   * In production, this would make actual blockchain transactions
   */
  private async simulateX402Payment(paymentRequest: any): Promise<{ transactionHash: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Generate mock transaction hash
    const mockTxHash = `0x${Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;

    // Simulate potential failure (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Simulated payment failure - insufficient funds or network error');
    }

    return {
      transactionHash: mockTxHash,
    };
  }

  /**
   * Check transaction status and confirmations
   */
  async getTransactionStatus(txHash: string): Promise<TransactionStatus> {
    try {
      if (!this.walletClient) {
        throw new Error('Wallet client not connected');
      }

      // In production, this would query the actual blockchain
      // For demo purposes, we'll simulate the status check
      return await this.simulateTransactionStatus(txHash);

    } catch (error) {
      console.error('Failed to get transaction status:', error);
      return {
        hash: txHash,
        status: 'failed',
        confirmations: 0,
      };
    }
  }

  /**
   * Simulate transaction status checking
   */
  private async simulateTransactionStatus(txHash: string): Promise<TransactionStatus> {
    // Simulate varying confirmation states
    const confirmations = Math.floor(Math.random() * 20);
    let status: 'pending' | 'confirmed' | 'failed' = 'pending';

    if (confirmations >= 12) {
      status = 'confirmed';
    } else if (confirmations > 0) {
      status = 'pending';
    } else if (Math.random() < 0.1) {
      status = 'failed';
    }

    return {
      hash: txHash,
      status,
      confirmations,
      blockNumber: status !== 'failed' ? Math.floor(Math.random() * 1000000) + 18000000 : undefined,
    };
  }

  /**
   * Get USDC balance for connected wallet
   */
  async getUSDCBalance(address: string): Promise<bigint> {
    try {
      if (!this.walletClient) {
        throw new Error('Wallet client not connected');
      }

      // In production, this would query the USDC contract
      // For demo purposes, return a mock balance
      return BigInt(Math.floor(Math.random() * 10000) * 1000000); // Random balance in microUSDC
      
    } catch (error) {
      console.error('Failed to get USDC balance:', error);
      return 0n;
    }
  }

  /**
   * Format USDC amount from wei to display format
   */
  static formatUSDC(amount: bigint): string {
    const decimals = 6; // USDC has 6 decimals
    const divisor = BigInt(10 ** decimals);
    const whole = amount / divisor;
    const fraction = amount % divisor;
    
    if (fraction === 0n) {
      return whole.toString();
    }
    
    const fractionStr = fraction.toString().padStart(decimals, '0').replace(/0+$/, '');
    return `${whole}.${fractionStr}`;
  }

  /**
   * Parse USDC amount from display format to wei
   */
  static parseUSDC(amount: string): bigint {
    const decimals = 6;
    const [whole, fraction = ''] = amount.split('.');
    const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(whole) * BigInt(10 ** decimals) + BigInt(paddedFraction);
  }
}

// Export singleton instance
export const paymentService = new PaymentService();