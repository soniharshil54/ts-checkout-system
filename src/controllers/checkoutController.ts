import { IncomingMessage, ServerResponse } from 'http';
import { CheckoutService } from '../services/checkoutService';
import { pricingRules } from '../utils/pricingRules';

const checkoutService = new CheckoutService(pricingRules);

export const scanItem = (req: IncomingMessage, res: ServerResponse, body: any): void => {
  const { sku } = JSON.parse(body);
  checkoutService.scan(sku);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Item scanned' }));
};

export const getTotal = (req: IncomingMessage, res: ServerResponse): void => {
  const total = checkoutService.total();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ total }));
};
