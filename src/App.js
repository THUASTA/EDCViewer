import './App.css'

import { Button, Popover } from 'antd';
import React, { useEffect, useState } from 'react';

import PlayerInfo from './PlayerInfo';
import VideoStreamPlayer from './VideoStreamPlayer';
import SettingsItem from './SettingsItem';
import GridCanvas from './GridCanvas';
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
      const start = document.getElementById("startbutton");
      const end = document.getElementById("endbutton");
      start.onclick = () => {
        ws.send(JSON.stringify({ messageType: "COMPETITION_CONTROL_COMMAND", command: "START", token: "114514" }));
      }
      end.onclick = () => {
        ws.send(JSON.stringify({ messageType: "COMPETITION_CONTROL_COMMAND", command: "END", token: "1919810" }));
      }
      return () => {
        ws.close(); // close the WebSocket connection when the component is unmounted
      };
    },
    []
  );

  const [calibrating, setCalibrating] = useState(false);

  // callback functions called when calibration finishes
  const finishCalibrate1 = () => {
    setCalibrating(false);
    console.log('camera1 calibrated');
    // send messages
  }

  const finishCalibrate2 = () => {
    setCalibrating(false);
    console.log('camera2 calibrated');
    // send messages
  }

  return (
    <div class='app-container'>
      <div class='top'>
        <div class='control-buttons-container'>
          <div class='control-buttons-row'>
            <Button type='primary' size='large' id="startbutton" block>Start</Button>
            <Button size="large" block
              onClick={() => setCalibrating(true)}
            >Calibrate</Button>
          </div>
          <div class='control-buttons-row'>
            <Button size="large" id="endbutton" block>End</Button>
            <Popover
              placement="bottomLeft"
              arrow={false}
              trigger="click"
              content={(
                <div>
                  <div class='flex'>
                    <SettingsItem title='Player 1' />
                    <SettingsItem title='Player 2' />
                  </div>
                  <Button>Confirm</Button>
                </div>
              )}
            >
              <Button size='large' block>Settings</Button>
            </Popover>
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
        <div class='video-canvas-container'>
          <div class='video-stream-player'>
            {camera1 ?
              <VideoStreamPlayer
                data={camera1.frameData}
                width={camera1.width}
                height={camera1.height}
              />
              : <></>}
          </div>
          <div class='grid-canvas'>
            <GridCanvas
              calibrating={calibrating} finishCalibrateCallback={finishCalibrate1} />
          </div>
        </div>
        <div class='video-canvas-container'>
          <div class='video-stream-player'>
            {camera2 ?
              <VideoStreamPlayer
                data={camera2.frameData}
                width={camera2.width}
                height={camera2.height}
              />
              : <></>}
          </div>
          <div class='grid-canvas'>
            <GridCanvas
              calibrating={calibrating} finishCalibrateCallback={finishCalibrate2} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;