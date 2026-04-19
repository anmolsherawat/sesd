import { User } from '../models/User';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { Customer } from '../models/Customer';
import { Admin } from '../models/Admin';

export class MockDatabase {
  private static instance: MockDatabase;
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;

  private constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.initializeMockData();
  }

  public static getInstance(): MockDatabase {
    if (!MockDatabase.instance) {
      MockDatabase.instance = new MockDatabase();
    }
    return MockDatabase.instance;
  }

  private initializeMockData(): void {
    const admin = new Admin(
      'admin-1',
      'Admin User',
      'admin@shopcore.com',
      'Operations'
    );
    this.users.set(admin.getId(), admin);

    const customer = new Customer(
      'customer-1',
      'John Doe',
      'john@example.com',
      '123 Main St, City',
      '555-1234'
    );
    this.users.set(customer.getId(), customer);

    const products = [
      new Product('prod-1', 'Laptop', 'High-performance laptop', 999.99, 10),
      new Product('prod-2', 'Smartphone', 'Latest smartphone', 699.99, 20),
      new Product('prod-3', 'Headphones', 'Wireless headphones', 199.99, 30),
      new Product('prod-4', 'Keyboard', 'Mechanical keyboard', 149.99, 15)
    ];
    products.forEach(product => this.products.set(product.getId(), product));
  }

  public getUsers(): Map<string, User> {
    return this.users;
  }

  public getProducts(): Map<string, Product> {
    return this.products;
  }

  public getOrders(): Map<string, Order> {
    return this.orders;
  }
}
