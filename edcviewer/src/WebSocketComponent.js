import React, { useEffect, useRef } from 'react';

const WebSocketComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const socket = new WebSocket('ws://localhost:8080'); // change the address to yours

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      
      const imageData = event.data; 

      // transfer the data to image
      const imageBlob = new Blob([imageData], { type: 'image/jpeg' }); 
      const imageObjectURL = URL.createObjectURL(imageBlob);

      const img = new Image();
      img.src = imageObjectURL;

      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(imageObjectURL); 
      };
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close(); // close the WebSocket connection when the component is unmounted
    };
  }, []);

  return (
    <div>
      <div>WebSocket图像</div>
      <canvas ref={canvasRef} width="300%" height="300%" />
    </div>
  );
};

export default WebSocketComponent;
