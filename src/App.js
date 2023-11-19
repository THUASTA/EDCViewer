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
  var coord1 = [];
  var coord2 = [];
  var calibrated1 = false;
  var calibrated2 = false;
  var message = true;
  function nullOrDefault(inputValue, defaultValue) {
    if (input === null || input === undefined) {
      return defaultValue;
    }
    else return inputValue;
  }
  function data1() {
    try {
      const inputs = document.getElementsByClassName("color-value");
      const hueCenter1 =nullOrDefault( parseInt(inputs[0].value) );
      const hueRange1 = nullOrDefault(parseInt(inputs[1].value) );
      const saturationCenter1 =nullOrDefault( parseInt(inputs[2].value) );
      const saturationRange1 =nullOrDefault( parseInt(inputs[3].value) );
      const valueCenter1 = nullOrDefault(parseInt(inputs[4].value) );
      const valueRange1 = nullOrDefault(parseInt(inputs[5].value) );
      const hueCenter2 =nullOrDefault( parseInt(inputs[6].value) );
      const hueRange2 = nullOrDefault(parseInt(inputs[7].value) );
      const saturationCenter2 = nullOrDefault(parseInt(inputs[8].value) );
      const saturationRange2 = nullOrDefault(parseInt(inputs[9].value) );
      const valueCenter2 = nullOrDefault(parseInt(inputs[10].value) );
      const valueRange2 = nullOrDefault(parseInt(inputs[11].value) );
      const areas = document.getElementsByClassName("area");
      const area1 = nullOrDefault(parseInt(areas[0].value) );
      const area2 = nullOrDefault(parseInt(areas[1].value) );
      const cameras = document.getElementsByClassName("camera-select");
      const camera1 = Number(cameras[0].value);
      const camera2 = Number(cameras[1].value);
      const ports = document.getElementsByClassName("port-select");
      const port1 = ports[0].value;
      const port2 = ports[1].value;
      const masks = document.getElementsByClassName("show-mask");
      const mask1 = masks[0].checked;
      const mask2 = masks[1].checked;
      const baud = document.getElementsByClassName("baudRate");
      const baudrate1 = Number(baud[0].value);
      const baudrate2 = Number(baud[1].value);
      const data1 = {
        messageType: "HOST_CONFIGURATION_FROM_CLIENT",
        token: "",
        players: [
          {
            playerId: 0,
            camera: {
              cameraId: camera1,
              recognition: {
                hueCenter: hueCenter1,
                hueRange: hueRange1,
                saturationCenter: saturationCenter1,
                saturationRange: saturationRange1,
                valueCenter: valueCenter1,
                valueRange: valueRange1,
                minArea: area1,
                showMask: mask1
              }
            },
            serialPort: {
              port: port1,
              baudrate: baudrate1
            }
          },
          {
            playerId: 1,
            camera: {
              cameraId: camera2,
              recognition: {
                hueCenter: hueCenter2,
                hueRange: hueRange2,
                saturationCenter: saturationCenter2,
                saturationRange: saturationRange2,
                valueCenter: valueCenter2,
                valueRange: valueRange2,
                minArea: area2,
                showMask: mask2
              }
            },
            serialPort: {
              port: port2,
              baudrate: baudrate2
            }

          }
        ]
      }
      return data1;
    }
    catch {
      return null;
    }
  }
  function data2() {
    const inputs = document.getElementsByClassName("color-value");
    const hueCenter1 = nullOrDefault(parseInt(inputs[0].value) );
    const hueRange1 = nullOrDefault(parseInt(inputs[1].value) );
    const saturationCenter1 = nullOrDefault(parseInt(inputs[2].value) );
    const saturationRange1 =nullOrDefault( parseInt(inputs[3].value) );
    const valueCenter1 = nullOrDefault(parseInt(inputs[4].value) );
    const valueRange1 = nullOrDefault(parseInt(inputs[5].value) );
    const hueCenter2 = nullOrDefault(parseInt(inputs[6].value) );
    const hueRange2 = nullOrDefault(parseInt(inputs[7].value) );
    const saturationCenter2 =nullOrDefault( parseInt(inputs[8].value) );
    const saturationRange2 = nullOrDefault(parseInt(inputs[9].value) );
    const valueCenter2 = nullOrDefault(parseInt(inputs[10].value) );
    const valueRange2 = nullOrDefault(parseInt(inputs[11].value) );
    const areas = document.getElementsByClassName("area");
    const area1 = nullOrDefault(parseInt(areas[0].value) );
    const area2 = nullOrDefault(parseInt(areas[1].value) );
    const cameras = document.getElementsByClassName("camera-select");
    const camera1 = Number(cameras[0].value);
    const camera2 = Number(cameras[1].value);
    const ports = document.getElementsByClassName("port-select");
    const port1 = ports[0].value;
    const port2 = ports[1].value;
    const masks = document.getElementsByClassName("show-mask");
    const mask1 = masks[0].checked;
    const mask2 = masks[1].checked;
    const baud = document.getElementsByClassName("baudRate");
    const baudrate1 = Number(baud[0].value);
    const baudrate2 = Number(baud[1].value);
    const corner1 = coord1;
    const corner2 = coord2;
    const data2 = {
      messageType: "HOST_CONFIGURATION_FROM_CLIENT",
      token: "",
      players: [
        {
          playerId: 0,
          camera: {
            cameraId: camera1,
            calibration: {
              topLeft: {
                x: corner1[0][0],
                y: corner1[0][1]
              },
              topRight: {
                x: corner1[1][0],
                y: corner1[1][1]
              },
              bottomLeft: {
                x: corner1[3][0],
                y: corner1[3][1]
              },
              bottomRight: {
                x: corner1[2][0],
                y: corner1[2][1]
              }
            },
            recognition: {
              hueCenter: hueCenter1,
              hueRange: hueRange1,
              saturationCenter: saturationCenter1,
              saturationRange: saturationRange1,
              valueCenter: valueCenter1,
              valueRange: valueRange1,
              minArea: area1,
              showMask: mask1
            }
          },
          serialPort: {
            port: port1,
            baudrate: baudrate1
          }
        },
        {
          playerId: 1,
          camera: {
            cameraId: camera2,
            calibration: {
              topLeft: {
                x: corner2[0][0],
                y: corner2[0][1]
              },
              topRight: {
                x: corner2[1][0],
                y: corner2[1][1]
              },
              bottomLeft: {
                x: corner2[3][0],
                y: corner2[3][1]
              },
              bottomRight: {
                x: corner2[2][0],
                y: corner2[2][1]
              }
            },
            recognition: {
              hueCenter: hueCenter2,
              hueRange: hueRange2,
              saturationCenter: saturationCenter2,
              saturationRange: saturationRange2,
              valueCenter: valueCenter2,
              valueRange: valueRange2,
              minArea: area2,
              showMask: mask2
            }
          },
          serialPort: {
            port: port2,
            baudrate: baudrate2
          }
        }
      ]
    }
    return data2;
  }
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
      const setting = document.getElementById("setting");
      const canvas = document.getElementById("canvas");
      setting.onclick = async () => {
        setTimeout(() => {
          const confirm = document.getElementById("confirmbutton");
          confirm.onclick = () => {
            if (calibrated1 && calibrated2) {
              ws.send(JSON.stringify(data2()));
              console.log('send data2');
            }
            else {
              ws.send(JSON.stringify(data1()));
              console.log('send data1');
            }
          }
        }, 1000)

      }

      start.onclick = () => {
        ws.send(JSON.stringify({ messageType: "COMPETITION_CONTROL_COMMAND", command: "START", token: "" }));
      }
      end.onclick = () => {
        ws.send(JSON.stringify({ messageType: "COMPETITION_CONTROL_COMMAND", command: "END", token: "" }));
      }
      canvas.onclick = () => {
        if (calibrated1 && calibrated2 && message) {
          ws.send(JSON.stringify(data2()));
          message = false;
          console.log('send data2');
        }
      }
      return () => {
        ws.close(); // close the WebSocket connection when the component is unmounted
      };
    },
    []
  );

  const [calibrating, setCalibrating] = useState(false);
  const finishCalibrate1 = (corner) => {
    setCalibrating(false);
    console.log('camera1 calibrated');
    for (let i = 0; i < 4; i++) {
      coord1[i] = corner[i];
    }
    calibrated1 = true;
    console.log(calibrated1)
    // send messages
  }

  const finishCalibrate2 = (corner) => {
    setCalibrating(false);
    console.log('camera2 calibrated');
    for (let i = 0; i < 4; i++) {
      coord2[i] = corner[i];
    }
    calibrated2 = true;
    // send messages
  }

  return (
    <div class='app-container'>
      <div class='top'>
        <div class='control-buttons-container'>
          <div class='control-buttons-row'>
            <Button type='primary' size='large' id="startbutton" block>Start</Button>
            <Button size="large" block
              onClick={() => { setCalibrating(true); calibrated1 = false; calibrated2 = false }}
            >Calibrate</Button>
          </div>
          <div class='control-buttons-row'>
            <Button size="large" id="endbutton" block>End</Button>
            <Popover
              id="popover"
              placement="bottomLeft"
              arrow={false}
              trigger="click"
              content={(
                <div>
                  <div class='flex'>
                    <SettingsItem title='Player 1' />
                    <SettingsItem title='Player 2' />
                  </div>
                  <Button id="confirmbutton">Confirm</Button>
                </div>
              )}
            >
              <Button size='large' block id="setting">Settings</Button>
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
      <div class='flex' id="canvas">
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