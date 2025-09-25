/**
 * Demo scenarios for testing the payment flow and error handling
 * These scenarios can be triggered manually for testing purposes
 */

import { PaymentService, PaymentConfig } from './payment-service';

export class DemoScenarios {
  private paymentService: PaymentService;

  constructor(paymentService: PaymentService) {
    this.paymentService = paymentService;
  }

  /**
   * Test successful payment scenario
   */
  async testSuccessfulPayment(): Promise<void> {
    console.log('🧪 Testing successful payment...');
    
    const config: PaymentConfig = {
      amount: PaymentService.parseUSDC('100.00'),
      recipients: [
        { address: '0x742d35Cc6634C0532925a3b8D400E4d1db34C0Ad', percentage: 50 },
        { address: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc', percentage: 50 },
      ],
      memo: 'Test payment - successful scenario',
    };

    try {
      const result = await this.paymentService.executePayment(config);
      console.log('✅ Payment result:', result);
    } catch (error) {
      console.error('❌ Payment failed:', error);
    }
  }

  /**
   * Test insufficient balance scenario
   */
  async testInsufficientBalance(): Promise<void> {
    console.log('🧪 Testing insufficient balance...');
    
    const config: PaymentConfig = {
      amount: PaymentService.parseUSDC('999999.00'), // Very large amount
      recipients: [
        { address: '0x742d35Cc6634C0532925a3b8D400E4d1db34C0Ad', percentage: 100 },
      ],
      memo: 'Test payment - insufficient balance',
    };

    try {
      const result = await this.paymentService.executePayment(config);
      console.log('✅ Payment result:', result);
    } catch (error) {
      console.error('❌ Expected error (insufficient balance):', error);
    }
  }

  /**
   * Test invalid recipients scenario
   */
  async testInvalidRecipients(): Promise<void> {
    console.log('🧪 Testing invalid recipients...');
    
    const config: PaymentConfig = {
      amount: PaymentService.parseUSDC('50.00'),
      recipients: [
        { address: 'invalid-address', percentage: 60 },
        { address: '0x742d35Cc6634C0532925a3b8D400E4d1db34C0Ad', percentage: 50 }, // Total > 100%
      ],
      memo: 'Test payment - invalid recipients',
    };

    try {
      const result = await this.paymentService.executePayment(config);
      console.log('✅ Payment result:', result);
    } catch (error) {
      console.error('❌ Expected error (invalid recipients):', error);
    }
  }

  /**
   * Test network failure scenario
   */
  async testNetworkFailure(): Promise<void> {
    console.log('🧪 Testing network failure...');
    
    // Temporarily break the axios instance to simulate network failure
    const originalTimeout = this.paymentService['axiosInstance'].defaults.timeout;
    this.paymentService['axiosInstance'].defaults.timeout = 1; // Very short timeout

    const config: PaymentConfig = {
      amount: PaymentService.parseUSDC('25.00'),
      recipients: [
        { address: '0x742d35Cc6634C0532925a3b8D400E4d1db34C0Ad', percentage: 100 },
      ],
      memo: 'Test payment - network failure',
    };

    try {
      const result = await this.paymentService.executePayment(config);
      console.log('✅ Payment result:', result);
    } catch (error) {
      console.error('❌ Expected error (network failure):', error);
    } finally {
      // Restore original timeout
      this.paymentService['axiosInstance'].defaults.timeout = originalTimeout;
    }
  }

  /**
   * Test transaction status monitoring
   */
  async testTransactionStatusMonitoring(): Promise<void> {
    console.log('🧪 Testing transaction status monitoring...');
    
    // Generate a mock transaction hash
    const mockTxHash = '0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01';
    
    console.log('📊 Checking transaction status...');
    const status = await this.paymentService.getTransactionStatus(mockTxHash);
    console.log('✅ Transaction status:', status);

    // Simulate monitoring over time
    console.log('⏱️ Monitoring transaction over time...');
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const currentStatus = await this.paymentService.getTransactionStatus(mockTxHash);
      console.log(`🔄 Status check ${i + 1}:`, currentStatus);
    }
  }

  /**
   * Test USDC balance checking
   */
  async testBalanceChecking(): Promise<void> {
    console.log('🧪 Testing USDC balance checking...');
    
    const testAddress = '0x742d35Cc6634C0532925a3b8D400E4d1db34C0Ad';
    
    try {
      const balance = await this.paymentService.getUSDCBalance(testAddress);
      const formattedBalance = PaymentService.formatUSDC(balance);
      console.log(`✅ USDC Balance for ${testAddress}: ${formattedBalance} USDC`);
    } catch (error) {
      console.error('❌ Failed to get balance:', error);
    }
  }

  /**
   * Test USDC amount formatting and parsing
   */
  testUSDCFormatting(): void {
    console.log('🧪 Testing USDC formatting and parsing...');
    
    const testAmounts = ['100.00', '1.50', '0.01', '999999.999999', '0'];
    
    testAmounts.forEach(amount => {
      try {
        const parsed = PaymentService.parseUSDC(amount);
        const formatted = PaymentService.formatUSDC(parsed);
        console.log(`✅ ${amount} -> ${parsed.toString()}n -> ${formatted}`);
      } catch (error) {
        console.error(`❌ Failed to format ${amount}:`, error);
      }
    });
  }

  /**
   * Run all test scenarios
   */
  async runAllTests(): Promise<void> {
    console.log('🎯 Starting comprehensive payment flow tests...\n');
    
    // Non-async tests
    this.testUSDCFormatting();
    console.log('\n');
    
    // Async tests
    const tests = [
      () => this.testSuccessfulPayment(),
      () => this.testInsufficientBalance(), 
      () => this.testInvalidRecipients(),
      () => this.testNetworkFailure(),
      () => this.testBalanceChecking(),
      () => this.testTransactionStatusMonitoring(),
    ];

    for (const test of tests) {
      try {
        await test();
        console.log('\n');
      } catch (error) {
        console.error('🚨 Test failed:', error);
        console.log('\n');
      }
    }
    
    console.log('🏁 All tests completed!');
  }
}

// Export convenience function for quick testing
export function createDemoScenarios(paymentService: PaymentService): DemoScenarios {
  return new DemoScenarios(paymentService);
}

// Example usage in browser console:
// import { paymentService } from './payment-service';
// import { createDemoScenarios } from './demo-scenarios';
// const demo = createDemoScenarios(paymentService);
// demo.runAllTests();