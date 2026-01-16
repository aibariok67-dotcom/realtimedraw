const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
  ws.on('message', msg => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

console.log('Server running on port', PORT);
