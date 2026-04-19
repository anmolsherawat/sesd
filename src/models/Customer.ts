import { User, UserRole } from './User';

export class Customer extends User {
  private address: string;
  private phone: string;

  constructor(id: string, name: string, email: string, address: string, phone: string) {
    super(id, name, email, UserRole.CUSTOMER);
    this.address = address;
    this.phone = phone;
  }

  public getAddress(): string {
    return this.address;
  }

  public getPhone(): string {
    return this.phone;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }

  public getInfo(): string {
    return `Customer: ${this.name} (${this.email}) - Phone: ${this.phone} - Address: ${this.address}`;
  }
}
