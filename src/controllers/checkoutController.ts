import { IncomingMessage, ServerResponse } from 'http';
import { CheckoutService } from '../services/checkoutService';

const checkoutService = new CheckoutService();

export const scanItem = (req: IncomingMessage, res: ServerResponse, body: any): void => {
  const { sku } = JSON.parse(body);
  checkoutService.scan(sku);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Item scanned' }));
};
