export interface PaymentProcessor {
  processPayment(amount: number): boolean;
  getPaymentMethodName(): string;
}
