import React, { useEffect } from 'react';
import './InventoryItem.css'

const InventoryItem = ({ item, count }) => {
    return (
        <div class='inventory-item-container'>
            <img
                class='inventory-item-icon'
                src={'assets/' + item + '.png'}>
            </img>
            <div class='inventory-item-count'>{count}</div>
        </div>
    )
}

export default InventoryItem;