// server.js

const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // handle http request here
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  // read the picture (change the path to yours) 
  fs.readFile('pic.jpg', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // senbd to client
    ws.send(data);
  });
});

server.listen(8080, () => {
  console.log('WebSocket server is running on port 8080');
});
