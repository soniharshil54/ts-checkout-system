import { IncomingMessage, ServerResponse } from 'http';

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
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  });
};

export { handleRequest };
