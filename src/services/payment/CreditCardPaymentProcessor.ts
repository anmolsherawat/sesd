import { PaymentProcessor } from './PaymentProcessor';

export class CreditCardPaymentProcessor implements PaymentProcessor {
  private cardNumber: string;
  private cvv: string;
  private expiryDate: string;

  constructor(cardNumber: string, cvv: string, expiryDate: string) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expiryDate = expiryDate;
  }

  public processPayment(amount: number): boolean {
    console.log(`Processing credit card payment of $${amount.toFixed(2)} using card ending with ${this.cardNumber.slice(-4)}`);
    return true;
  }

  public getPaymentMethodName(): string {
    return 'Credit Card';
  }
}
