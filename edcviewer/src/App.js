import './App.css'

import {Button} from 'antd';
import React, {Component} from 'react';

import PlayerInfo from './PlayerInfo';
import WebSocketComponent from './WebSocketComponent';

class App extends Component {
  render() {
    return (
      <div class='app-container'>
        <div class='top'>
          <div class='control-buttons-container'>
            <div class='control-buttons-row'>
              <Button type='primary' size='large' block>Start</Button>
              <Button size="large" block>Calibrate</Button>
            </div>
            <div class='control-buttons-row'>
              <Button size="large" block>End</Button>
              <Button size='large' block>Settings</Button>
            </div>
          </div>
          <div class='player-list-container'>
            <PlayerInfo/>
            <PlayerInfo/>
          </div>
        </div>
        <WebSocketComponent />
      </div>
    );
  }
}

export default App;