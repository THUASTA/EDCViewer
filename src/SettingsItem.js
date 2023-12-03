import './SettingsItem.css'

import React, { useState } from 'react';

const SettingsItem = ({ title }) => {
    const [hue, setHue] = useState({ center: undefined, range: undefined });
    const [saturation, setSatuarion] = useState({ center: undefined, range: undefined });
    const [value, setValue] = useState({ center: undefined, range: undefined });
    const [minArea, setMinArea] = useState(undefined);
    const [camera, SetCamera] = useState('0');
    const [port, setPort] = useState('COM9');
    const [showMask, setShowMask] = useState(false);
    const [baudRate, setBaudRate] = useState('115200');
    const [cameraContrast, setCameraContrast] = useState(undefined);
    const [cameraBrightness, setCameraBrightness] = useState(undefined);
    const [cameraExposure, setCameraExposure] = useState(undefined);
    const [cameraAutoExposure, setCameraAutoExposure] = useState(undefined);
    const [cameraSaturation, setCameraSaturation] = useState(undefined);
    return (

        <div class='settings-container'>
            <span class='settings-title'>{title}</span>
            <div class='settings-items-container'>
                <div class='settings-item'>
                    <span class='settings-item-label'>Hue</span>
                    <div class='settings-item-value-container'>
                        <input type='number' class='color-value' placeholder='center'
                            value={hue.center}
                            onChange={(e) => setHue({ center: e.target.value, range: hue.range })}
                        />
                        <input type='number' class='color-value' placeholder='range'
                            value={hue.range}
                            onChange={(e) => setHue({ center: hue.center, range: e.target.value })}
                        />
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>Saturation</span>
                    <div class='settings-item-value-container'>
                        <input type='number' class='color-value' placeholder='center'
                            value={saturation.center}
                            onChange={(e) => setSatuarion({ center: e.target.value, range: saturation.range })}
                        />
                        <input type='number' class='color-value' placeholder='range'
                            value={saturation.range}
                            onChange={(e) => setSatuarion({ center: saturation.center, range: e.target.value })}
                        />
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>Value</span>
                    <div class='settings-item-value-container'>
                        <input type='number' class='color-value' placeholder='center'
                            value={value.center}
                            onChange={(e) => setValue({ center: e.target.value, range: value.range })}
                        />
                        <input type='number' class='color-value' placeholder='range'
                            value={value.range}
                            onChange={(e) => setValue({ center: value.center, range: e.target.value })}
                        />
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>Min-Area</span>
                    <div class='settings-item-value-container'>
                        <input type='number' class='area' placeholder='min-area'
                            value={minArea}
                            onChange={(e) => setMinArea(e.target.value)}
                        />
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>Camera</span>
                    <div class='settings-item-value-container'>
                        <select class='camera-select'
                            value={camera}
                            onChange={(e) => SetCamera(e.target.value)}
                        >
                            <option>0</option>
                            <option>1</option>
                        </select>
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>Port</span>
                    <div class='settings-item-value-container'>
                        <select class='port-select'
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                        >
                            <option>COM9</option>
                        </select>
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>Show Mask</span>
                    <div class='settings-item-value-container'>
                        <input type='checkbox' class='show-mask'
                            value={showMask}
                            onChange={(e) => setShowMask(e.target.value)}
                        />
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>BaudRate</span>
                    <div class='settings-item-value-container'>
                        <select class='baudRate'
                            value={baudRate}
                            onChange={(e) => setBaudRate(e.target.value)}
                        >
                            <option>2400</option>
                            <option>4800</option>
                            <option>9600</option>
                            <option>19200</option>
                            <option>38400</option>
                            <option>57600</option>
                            <option>115200</option>
                        </select>
                    </div>
                </div>

                <div class='settings-item'>
                    <span class='settings-item-label'>Camera Brightness</span>
                    <div class='settings-item-value-container'>
                        <input type='number' class='camera-setting' placeholder='brightness'>
                            value={cameraBrightness}
                            onChange={(e) => setCameraBrightness(e.target.value)}
                        </input>
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>Camera Contrast</span>
                    <div class='settings-item-value-container'>
                        <input type='number' class='camera-setting' placeholder='contrast'>
                            value={cameraContrast}
                            onChange={(e) => setCameraContrast(e.target.value)}
                        </input>
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>Camera Saturation</span>
                    <div class='settings-item-value-container'>
                        <input type='number' class='camera-setting' placeholder='saturation'>
                            value={cameraSaturation}
                            onChange={(e) => setCameraSaturation(e.target.value)}
                        </input>
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>Camera Exposure</span>
                    <div class='settings-item-value-container'>
                        <input type='number' class='camera-setting' placeholder='exposure'>
                            value={cameraExposure}
                            onChange={(e) => setCameraExposure(e.target.value)}
                        </input>
                    </div>
                </div>
                <div class='settings-item'>
                    <span class='settings-item-label'>Camera Auto Exposure</span>
                    <div class='settings-item-value-container'>
                        <input type='checkbox' class='camera-setting' placeholder='auto-exposure'>
                            value={cameraAutoExposure}
                            onChange={(e) => setCameraAutoExposure(e.target.value)}
                        </input>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SettingsItem;