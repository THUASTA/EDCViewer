import './SettingsItem.css'

import React, { useState } from 'react';

const SettingsItem = ({ title }) => {
    const [hue, setHue] = useState({ center: undefined, range: undefined });
    const [saturation, setSatuarion] = useState({ center: undefined, range: undefined });
    const [value, setValue] = useState({ center: undefined, range: undefined });
    const [camera, SetCamera] = useState('0');
    const [port, setPort] = useState('COM9');
    const [showMask, setShowMask] = useState(false);

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
                    <span class='settings-item-label'>Camera</span>
                    <div class='settings-item-value-container'>
                        <select
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
                        <select
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
                        <input type='checkbox'
                            value={showMask}
                            onChange={(e) => setShowMask(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsItem;