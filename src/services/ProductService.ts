import { Product } from '../models/Product';
import { ProductRepository } from '../repositories/ProductRepository';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public getAllProducts(): Product[] {
    return this.productRepository.findAll();
  }

  public getProductById(id: string): Product | undefined {
    return this.productRepository.findById(id);
  }

  public createProduct(product: Product): Product {
    return this.productRepository.save(product);
  }

  public updateProduct(id: string, productData: Partial<Product>): Product | undefined {
    const product = this.productRepository.findById(id);
    if (!product) {
      return undefined;
    }
    if (productData.getName()) product.setName(productData.getName());
    if (productData.getDescription()) product.setDescription(productData.getDescription());
    if (productData.getPrice()) product.setPrice(productData.getPrice());
    if (productData.getStock()) product.setStock(productData.getStock());
    return this.productRepository.save(product);
  }

  public deleteProduct(id: string): boolean {
    return this.productRepository.deleteById(id);
  }
}
