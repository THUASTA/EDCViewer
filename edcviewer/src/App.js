import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class VideoStream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoStream: null,
    };

    this.websocket = new WebSocket('wss://your-websocket-server-url'); // 替换为实际的WebSocket服务器URL
  }

  componentDidMount() {
    this.websocket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.websocket.onmessage = (event) => {
      const videoStream = URL.createObjectURL(event.data);
      this.setState({ videoStream });
    };

    this.websocket.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }

  componentWillUnmount() {
    this.websocket.close();
  }

  render() {
    return (
      <div>
        <h1>Video Stream</h1>
        {this.state.videoStream && (
          <ReactPlayer
            url={this.state.videoStream}
            playing={true}
            controls={true}
            width="640px"
            height="480px"
          />
        )}
      </div>
    );
  }
}

export default VideoStream;
