import React from 'react';
import { ShoppingItemProps } from '../interfaces';
import '../styles/ShoppingItem.scss';

const ShoppingItem: React.FC<ShoppingItemProps> = ({ item, handleIncrement, handleDecrement }) => {
    return (
        <li className={'shopping-item'}>
            <div className="info">
                <span className="name">{item.name}</span><span className="quantity">x{item.quantity}</span>
            </div>
            <div className="controls">
                <button onClick={() => handleDecrement(item.name)}>-</button>
                <button onClick={() => handleIncrement(item.name)}>+</button>
            </div>
        </li>
    );
};

export default ShoppingItem;