import { IncomingMessage, ServerResponse } from 'http';
import { scanItem } from './controllers/checkoutController';

const routes: { [key: string]: (req: IncomingMessage, res: ServerResponse, body?: any) => void } = {
  '/api/checkout/scan': scanItem,
};

const handleRequest = (req: IncomingMessage, res: ServerResponse): void => {
  const { method, url } = req;
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    if (method === 'GET' && url === '/api/healthcheck') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Server is running' }));
    } else if (method === 'POST' && url === '/api/checkout/scan') {
      routes[url](req, res, body);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  });
};

export { handleRequest };
