import { Product, products } from '../models/product';

export class CheckoutService {
  private items: Product[] = [];

  scan(sku: string): void {
    const product = products.find(p => p.sku === sku);
    if (product) {
      this.items.push(product);
    }
    console.log(this.items);
  }
}
