import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public getAllProducts = (req: Request, res: Response): void => {
    const products = this.productService.getAllProducts();
    res.json(products.map(product => ({
      id: product.getId(),
      name: product.getName(),
      description: product.getDescription(),
      price: product.getPrice(),
      stock: product.getStock()
    })));
  };

  public getProductById = (req: Request, res: Response): void => {
    const product = this.productService.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({
      id: product.getId(),
      name: product.getName(),
      description: product.getDescription(),
      price: product.getPrice(),
      stock: product.getStock()
    });
  };
}
