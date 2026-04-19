import { Product } from './Product';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered'
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export class Order {
  private id: string;
  private customerId: string;
  private items: OrderItem[];
  private status: OrderStatus;
  private totalAmount: number;
  private createdAt: Date;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = OrderStatus.PENDING;
    this.createdAt = new Date();
    this.totalAmount = this.calculateTotal();
  }

  private calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.product.getPrice() * item.quantity, 0);
  }

  public getId(): string {
    return this.id;
  }

  public getCustomerId(): string {
    return this.customerId;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public getTotalAmount(): number {
    return this.totalAmount;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setStatus(status: OrderStatus): void {
    this.status = status;
  }
}
