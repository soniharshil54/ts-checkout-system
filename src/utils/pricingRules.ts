export interface PricingRule {
  sku: string;
  discountType: 'bulk' | 'multiBuy';
  threshold?: number;
  discountPrice?: number;
  payFor?: number;
  getFor?: number;
}

export const pricingRules: PricingRule[] = [
  { sku: 'ipd', discountType: 'bulk', threshold: 4, discountPrice: 499.99 },
  { sku: 'atv', discountType: 'multiBuy', payFor: 2, getFor: 3 },
];
