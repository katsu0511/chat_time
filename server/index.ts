import dotenv from 'dotenv';
import path from 'path';
import next from 'next';
import { createServer } from 'http';
import createWebSocketServer from './websocket';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const portNext = parseInt(process.env.PORT || '', 10);
// const portWS = parseInt(process.env.WS_PORT || '3001', 10);

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  server.listen(portNext, () => {
    console.log(`Server ready on http://${process.env.IP}:${portNext}`);
  });

  // createWebSocketServer(portWS);
  createWebSocketServer(server);
});
