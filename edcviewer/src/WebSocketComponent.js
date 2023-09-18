import React, { useEffect, useRef } from 'react';

const WebSocketComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const socket = new WebSocket('ws://localhost:8080'); // 替换为您的WebSocket服务器URL

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      // 接收到图像数据
      const imageData = event.data; // 假设图像数据是二进制数据

      // 解码并绘制图像到Canvas
      const imageBlob = new Blob([imageData], { type: 'image/jpeg' }); // 根据实际数据类型进行更改
      const imageObjectURL = URL.createObjectURL(imageBlob);

      const img = new Image();
      img.src = imageObjectURL;

      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(imageObjectURL); // 释放URL对象
      };
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close(); // 组件卸载时关闭WebSocket连接
    };
  }, []);

  return (
    <div>
      <div>WebSocket图像</div>
      <canvas ref={canvasRef} width={400} height={300} />
    </div>
  );
};

export default WebSocketComponent;
