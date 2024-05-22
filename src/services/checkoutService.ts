import { Product, products } from '../models/product';
import { PricingRule, pricingRules } from '../utils/pricingRules';

export class CheckoutService {
  private items: Product[] = [];
  private pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  scan(sku: string): void {
    const product = products.find(p => p.sku === sku);
    if (product) {
      this.items.push(product);
    }
    console.log(this.items);
  }

  total(): number {
    let total = 0;
    const itemCount: { [key: string]: number } = {};

    this.items.forEach(item => {
      itemCount[item.sku] = (itemCount[item.sku] || 0) + 1;
    });

    for (const [sku, count] of Object.entries(itemCount)) {
      const product = products.find(p => p.sku === sku);
      const rule = this.pricingRules.find(r => r.sku === sku);

      if (product && rule) {
        switch (rule.discountType) {
          case 'bulk':
            if (count > (rule.threshold || 0)) {
              total += count * (rule.discountPrice || product.price);
            } else {
              total += count * product.price;
            }
            break;
          case 'multiBuy':
            const payFor = rule.payFor || 1;
            const getFor = rule.getFor || 1;
            total += Math.floor(count / getFor) * payFor * product.price + (count % getFor) * product.price;
            break;
        }
      } else if (product) {
        total += count * product.price;
      }
    }
    this.items = [];
    return total;
  }
}
