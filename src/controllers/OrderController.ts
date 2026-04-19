import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { ProductService } from '../services/ProductService';
import { UPIPaymentProcessor } from '../services/payment/UPIPaymentProcessor';
import { CreditCardPaymentProcessor } from '../services/payment/CreditCardPaymentProcessor';
import { OrderItem } from '../models/Order';

export class OrderController {
  private orderService: OrderService;
  private productService: ProductService;

  constructor() {
    this.orderService = new OrderService();
    this.productService = new ProductService();
  }

  public getAllOrders = (req: Request, res: Response): void => {
    const orders = this.orderService.getAllOrders();
    res.json(orders.map(order => ({
      id: order.getId(),
      customerId: order.getCustomerId(),
      items: order.getItems().map(item => ({
        productId: item.product.getId(),
        productName: item.product.getName(),
        quantity: item.quantity,
        price: item.product.getPrice()
      })),
      totalAmount: order.getTotalAmount(),
      status: order.getStatus(),
      createdAt: order.getCreatedAt()
    })));
  };

  public getOrderById = (req: Request, res: Response): void => {
    const order = this.orderService.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json({
      id: order.getId(),
      customerId: order.getCustomerId(),
      items: order.getItems().map(item => ({
        productId: item.product.getId(),
        productName: item.product.getName(),
        quantity: item.quantity,
        price: item.product.getPrice()
      })),
      totalAmount: order.getTotalAmount(),
      status: order.getStatus(),
      createdAt: order.getCreatedAt()
    });
  };

  public getOrdersByCustomerId = (req: Request, res: Response): void => {
    const orders = this.orderService.getOrdersByCustomerId(req.params.customerId);
    res.json(orders.map(order => ({
      id: order.getId(),
      totalAmount: order.getTotalAmount(),
      status: order.getStatus(),
      createdAt: order.getCreatedAt()
    })));
  };

  public createOrder = (req: Request, res: Response): void => {
    const { customerId, items } = req.body;
    if (!customerId || !items || items.length === 0) {
      res.status(400).json({ message: 'Customer ID and items are required' });
      return;
    }

    const orderItems: OrderItem[] = [];
    for (const item of items) {
      const product = this.productService.getProductById(item.productId);
      if (!product) {
        res.status(404).json({ message: `Product ${item.productId} not found` });
        return;
      }
      orderItems.push({ product, quantity: item.quantity });
    }

    const order = this.orderService.createOrder(customerId, orderItems);
    if (!order) {
      res.status(400).json({ message: 'Insufficient stock' });
      return;
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.getId(),
        totalAmount: order.getTotalAmount(),
        status: order.getStatus()
      }
    });
  };

  public processPayment = (req: Request, res: Response): void => {
    const { orderId, paymentMethod, paymentDetails } = req.body;
    if (!orderId || !paymentMethod) {
      res.status(400).json({ message: 'Order ID and payment method are required' });
      return;
    }

    let paymentProcessor;
    if (paymentMethod === 'upi') {
      if (!paymentDetails?.upiId) {
        res.status(400).json({ message: 'UPI ID is required' });
        return;
      }
      paymentProcessor = new UPIPaymentProcessor(paymentDetails.upiId);
    } else if (paymentMethod === 'creditcard') {
      if (!paymentDetails?.cardNumber || !paymentDetails?.cvv || !paymentDetails?.expiryDate) {
        res.status(400).json({ message: 'Card details are required' });
        return;
      }
      paymentProcessor = new CreditCardPaymentProcessor(
        paymentDetails.cardNumber,
        paymentDetails.cvv,
        paymentDetails.expiryDate
      );
    } else {
      res.status(400).json({ message: 'Invalid payment method' });
      return;
    }

    const success = this.orderService.processPayment(orderId, paymentProcessor);
    if (!success) {
      res.status(400).json({ message: 'Payment failed' });
      return;
    }

    res.json({ message: 'Payment successful' });
  };
}
