import React, { Component } from 'react';
import WebSocketComponent from './WebSocketComponent';
import PlayerInfo from './PlayerInfo';
import { Button } from 'antd';
import './App.css'
class App extends Component {
  render() {
    return (
      <div class='app-container'>
        <div class='top'>
          <div class='control-buttons-container'>
            <div class='control-buttons-row'>
              <Button type="primary" size="large" block>Start</Button>
              <Button size="large" block>Calibrate</Button>
            </div>
            <div class='control-buttons-row'>
              <Button size="large" block>End</Button>
              <Button size="large" block>Settings</Button>
            </div>
          </div>
          <div class='player-list-container'>
            <PlayerInfo
              playerId={1}
              health={1}
              maxHealth={20}
              agility={10}
              strength={10}
              emerald={64}
              wool={12}
            />
            <PlayerInfo
              playerId={2}
              health={3}
              maxHealth={20}
              agility={8}
              strength={12}
              emerald={1}
              wool={40}
            />
          </div>
        </div>
        <WebSocketComponent />
      </div>
    );
  }
}

export default App;