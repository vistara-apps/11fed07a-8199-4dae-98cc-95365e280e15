export const SUPPORTED_CHAINS = {
  BASE_SEPOLIA: {
    id: 84532,
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
  },
  BASE_MAINNET: {
    id: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
  },
} as const;

export const PAYOUT_TYPES = {
  BURST: 'BURST',
  STREAMING: 'STREAMING',
} as const;

export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
} as const;

export const PROOF_TYPES = {
  ONCHAIN: 'ONCHAIN',
  OFFCHAIN: 'OFFCHAIN',
  ZK: 'ZK',
} as const;

export const STREAMING_FREQUENCIES = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
] as const;

export const USDC_BASE_CONTRACT = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const;

export const THEME_CONFIG = {
  default: {
    name: 'Finance Pro',
    description: 'Professional dark navy with gold accents',
  },
  celo: {
    name: 'Celo',
    description: 'Black background with yellow highlights',
  },
  solana: {
    name: 'Solana',
    description: 'Dark purple with magenta accents',
  },
  base: {
    name: 'Base',
    description: 'Base blue with clean design',
  },
  coinbase: {
    name: 'Coinbase',
    description: 'Dark navy with Coinbase blue',
  },
} as const;
