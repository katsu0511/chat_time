import { Server, IncomingMessage } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

// export default function createWebSocketServer(port: number) {
export default function createWebSocketServer(server: Server) {
  // const wss = new WebSocketServer({ port });
  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    console.log('WebSocket connected from', req.socket.remoteAddress);

    ws.on('error', () => {
      console.error('WebSocket error happened');
    });

    ws.on('message', (message) => {
      const data = JSON.parse(message.toString());
      console.log('Received:', data);
      if (data.type === 'message') {
        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify({ type: 'message', message: data.message }));
          }
        });
      }
    });

    ws.on('close', () => {
      console.log('WebSocket disconnected');
    });
  });

  server.on('upgrade', (req, socket, head) => {
    if (req.url === '/ws') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  console.log('WebSocket server attached');
}
