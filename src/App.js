import './App.css'

import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

import PlayerInfo from './PlayerInfo';
import VideoStreamPlayer from './VideoStreamPlayer';
import Grid from './Grid';
const server = 'ws://localhost:8080'

const App = () => {
  const [camera1, setCamera1] = useState(null);
  const [camera2, setCamera2] = useState(null);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  useEffect(
    () => {
      const ws = new WebSocket(server);

      ws.onopen = () => {
        console.log('WebSocket connected to ' + server);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // about the data format, see https://thuasta.github.io/EDCHost/api/viewer/
        if (data.messageType === 'COMPETITION_UPDATE') {
          setCamera1(data.cameras.find((value) => value.cameraId === 1));
          setCamera2(data.cameras.find((value) => value.cameraId === 2));
          setPlayer1(data.players.find((value) => value.playerId === 1));
          setPlayer2(data.players.find((value) => value.playerId === 2));
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };

      return () => {
        ws.close(); // close the WebSocket connection when the component is unmounted
      };
    },
    []
  );

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
          <PlayerInfo
            playerId={1}
            health={player1 ? player1.health : undefined}
            maxHealth={player1 ? player1.attributes.maxHealth : undefined}
            agility={player1 ? player1.attributes.agility : undefined}
            strength={player1 ? player1.attributes.strength : undefined}
            emerald={player1 ? player1.inventory.emerald : undefined}
            wool={player1 ? player1.inventory.wool : undefined}
          />
          <PlayerInfo
            playerId={2}
            health={player2 ? player2.health : undefined}
            maxHealth={player2 ? player2.attributes.maxHealth : undefined}
            agility={player2 ? player2.attributes.agility : undefined}
            strength={player2 ? player2.attributes.strength : undefined}
            emerald={player2 ? player2.inventory.emerald : undefined}
            wool={player2 ? player2.inventory.wool : undefined}
          />
        </div>
      </div>
      <div class='flex'>
        {camera1 ?
          <VideoStreamPlayer
            data={camera1.frameData}
            width={camera1.width}
            height={camera1.height}
          />
          : <></>}
        {camera2 ?
          <VideoStreamPlayer
            data={camera2.frameData}
            width={camera2.width}
            height={camera2.height}
          />
          : <></>}
      </div>
    </div>
  )
}

export default App;