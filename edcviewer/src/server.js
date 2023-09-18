// server.js

const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // 如果需要，可以在这里处理HTTP请求
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  // 当有WebSocket连接建立时

  // 读取图像文件（这里假设图像文件为一个JPEG文件）
  fs.readFile('pic.jpg', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // 发送图像数据到前端
    ws.send(data);
  });
});

server.listen(8080, () => {
  console.log('WebSocket server is running on port 8080');
});
