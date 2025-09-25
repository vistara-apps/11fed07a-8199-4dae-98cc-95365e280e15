export interface User {
  userId: string;
  walletAddress: string;
  createdAt: string;
}

export interface PayoutConfig {
  payoutConfigId: string;
  userId: string;
  payoutType: 'STREAMING' | 'BURST';
  frequency?: string;
  startTime?: string;
  splitRatio: Record<string, number>;
  recipients: Array<{
    address: string;
    percentage: number;
  }>;
  createdAt: string;
}

export interface TransactionLog {
  transactionId: string;
  payoutConfigId: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  txHash?: string;
  timestamp: string;
  proofHashes: string[];
  createdAt: string;
}

export interface ProofArtifact {
  proofId: string;
  transactionId: string;
  type: 'ONCHAIN' | 'OFFCHAIN' | 'ZK';
  artifactUrl: string;
  createdAt: string;
}

export type Theme = 'default' | 'celo' | 'solana' | 'base' | 'coinbase';

export interface DashboardMetrics {
  totalPayouts: number;
  activeStreams: number;
  totalRecipients: number;
  proofVerification: number;
}
