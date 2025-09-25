import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwindcss-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(
    typeof date === 'string' ? new Date(date) : date
  );
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100 * 100) / 100; // Round to 2 decimal places
}

export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function validatePercentages(recipients: Array<{ percentage: number }>): boolean {
  const total = recipients.reduce((sum, recipient) => sum + recipient.percentage, 0);
  return Math.abs(total - 100) < 0.01; // Allow for small floating point errors
}

export function generateTransactionId(): string {
  return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
