import { PaymentProcessor } from './PaymentProcessor';

export class UPIPaymentProcessor implements PaymentProcessor {
  private upiId: string;

  constructor(upiId: string) {
    this.upiId = upiId;
  }

  public processPayment(amount: number): boolean {
    console.log(`Processing UPI payment of $${amount.toFixed(2)} using UPI ID: ${this.upiId}`);
    return true;
  }

  public getPaymentMethodName(): string {
    return 'UPI';
  }
}
