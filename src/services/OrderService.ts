import { Order, OrderItem, OrderStatus } from '../models/Order';
import { OrderRepository } from '../repositories/OrderRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { PaymentProcessor } from './payment/PaymentProcessor';

export class OrderService {
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.productRepository = new ProductRepository();
  }

  public getAllOrders(): Order[] {
    return this.orderRepository.findAll();
  }

  public getOrderById(id: string): Order | undefined {
    return this.orderRepository.findById(id);
  }

  public getOrdersByCustomerId(customerId: string): Order[] {
    return this.orderRepository.findByCustomerId(customerId);
  }

  public createOrder(customerId: string, items: OrderItem[]): Order | undefined {
    for (const item of items) {
      const product = this.productRepository.findById(item.product.getId());
      if (!product || product.getStock() < item.quantity) {
        return undefined;
      }
    }

    for (const item of items) {
      const product = this.productRepository.findById(item.product.getId());
      if (product) {
        product.reduceStock(item.quantity);
        this.productRepository.save(product);
      }
    }

    const orderId = 'order-' + Date.now();
    const order = new Order(orderId, customerId, items);
    return this.orderRepository.save(order);
  }

  public processPayment(orderId: string, paymentProcessor: PaymentProcessor): boolean {
    const order = this.orderRepository.findById(orderId);
    if (!order || order.getStatus() !== OrderStatus.PENDING) {
      return false;
    }

    const paymentSuccess = paymentProcessor.processPayment(order.getTotalAmount());
    if (paymentSuccess) {
      order.setStatus(OrderStatus.PAID);
      this.orderRepository.save(order);
      return true;
    }
    return false;
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): Order | undefined {
    const order = this.orderRepository.findById(orderId);
    if (!order) {
      return undefined;
    }
    order.setStatus(status);
    return this.orderRepository.save(order);
  }

  public deleteOrder(id: string): boolean {
    return this.orderRepository.deleteById(id);
  }
}
