export class Product {
  private id: string;
  private name: string;
  private description: string;
  private price: number;
  private stock: number;

  constructor(id: string, name: string, description: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public getStock(): number {
    return this.stock;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public setStock(stock: number): void {
    this.stock = stock;
  }

  public reduceStock(quantity: number): boolean {
    if (this.stock >= quantity) {
      this.stock -= quantity;
      return true;
    }
    return false;
  }
}
