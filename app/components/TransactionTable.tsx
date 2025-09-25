'use client';

import { useState, Fragment } from 'react';
import { ExternalLink, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';
import { ProofStatusBadge } from './ProofStatusBadge';
import { TransactionStatus } from './TransactionStatus';

interface Transaction {
  id: string;
  type: 'STREAMING' | 'BURST';
  amount: number;
  recipients: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  txHash?: string;
  timestamp: string;
  proofStatus: 'pending' | 'verified' | 'failed';
}

interface TransactionTableProps {
  variant?: 'default';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'BURST',
    amount: 1000,
    recipients: 3,
    status: 'SUCCESS',
    txHash: '0x1234...5678',
    timestamp: '2024-01-15T10:30:00Z',
    proofStatus: 'verified'
  },
  {
    id: '2',
    type: 'STREAMING',
    amount: 5000,
    recipients: 5,
    status: 'PENDING',
    timestamp: '2024-01-15T09:15:00Z',
    proofStatus: 'pending'
  },
  {
    id: '3',
    type: 'BURST',
    amount: 750,
    recipients: 2,
    status: 'FAILED',
    timestamp: '2024-01-14T16:45:00Z',
    proofStatus: 'failed'
  }
];

export function TransactionTable({ variant = 'default' }: TransactionTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [showTransactionDetails, setShowTransactionDetails] = useState<string | null>(null);

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-error" />;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-semibold text-textPrimary">Transaction History</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Recipients
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Proof
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {mockTransactions.map((transaction) => (
              <Fragment key={transaction.id}>
                <tr className="transaction-row">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'STREAMING' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-accent/20 text-accent'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary font-medium">
                    ${transaction.amount.toLocaleString()} USDC
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                    {transaction.recipients} recipients
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className="text-sm text-textSecondary capitalize">
                        {transaction.status.toLowerCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ProofStatusBadge variant={transaction.proofStatus} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                    {formatDate(transaction.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowTransactionDetails(
                          showTransactionDetails === transaction.id ? null : transaction.id
                        )}
                        className="text-accent hover:text-accent/80"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {transaction.txHash && (
                        <a
                          href={`https://basescan.org/tx/${transaction.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-textSecondary hover:text-textPrimary"
                          title="View on Basescan"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
                {/* Transaction Details Row */}
                {showTransactionDetails === transaction.id && transaction.txHash && (
                  <tr key={`${transaction.id}-details`}>
                    <td colSpan={7} className="px-6 py-4 bg-surface/30">
                      <TransactionStatus 
                        txHash={transaction.txHash}
                        autoRefresh={transaction.status === 'PENDING'}
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {mockTransactions.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-textSecondary">No transactions found</p>
        </div>
      )}
    </div>
  );
}
