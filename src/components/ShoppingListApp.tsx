import React, { useState, useEffect } from 'react';
import { ShoppingListAppProps, ShoppingListAppState, Item } from '../interfaces';
import ShoppingItem from './ShoppingItem';
import '../styles/ShoppingListApp.scss';

const ShoppingListApp: React.FC<ShoppingListAppProps> = ({ items }) => {
    const initialState: ShoppingListAppState = {
        items: items,
        newItemName: '',
        newItemQuantity: 1
    };

    const [state, setState] = useState<ShoppingListAppState>(initialState);

    useEffect(() => {
        const savedState = window.localStorage.getItem('state');
        if (savedState) {
            setState(JSON.parse(savedState));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('state', JSON.stringify(state));
    }, [state]);

    const handleIncrement = (itemName: string) => {
        const newItems = state.items.map(item => {
            if (item.name === itemName) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });

        setState({ ...state, items: newItems });
    };

    const handleDecrement = (itemName: string) => {
        const newItems = state.items.map(item => {
            if (item.name === itemName) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }).filter(item => item.quantity > 0);

        setState({ ...state, items: newItems });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const asciiValue = convertToASCII(value);
        setState({ ...state, newItemName: asciiValue });
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value >= 1) {
            setState({ ...state, newItemQuantity: value });
        }
        if (value >= 50) {
            setState({ ...state, newItemQuantity: 50 });
        }
    };

    const handleNewItem = () => {
        if (state.newItemName.trim() === "") {
            return;
        }

        const itemNames = state.items.map(item => item.name.toLowerCase());
        const existingItemIndex = itemNames.indexOf(state.newItemName.toLowerCase());

        if (existingItemIndex !== -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += state.newItemQuantity;
            setState({ ...state, items: newItems, newItemName: '', newItemQuantity: 1 });
        } else {
            const newItem: Item = { name: state.newItemName, quantity: state.newItemQuantity };
            const newItems = [...state.items, newItem];
            setState({ ...state, items: newItems, newItemName: '', newItemQuantity: 1 });
        }
    };

    const handleReset = () => {
        setState(initialState);
    };

    const convertToASCII = (str: string) => {
        const nonASCII: Record<string, string> = {
            'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u', 'ñ': 'n',
            'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
            'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
            'ą': 'a', 'ę': 'e', 'ė': 'e', 'č': 'c', 'š': 's',
            'ř': 'r', 'ž': 'z', 'ý': 'y', 'á': 'a', 'í': 'i',
            'é': 'e', 'ů': 'u', 'ú': 'u', 'ť': 't', 'ď': 'd',
            'ň': 'n', 'ó': 'o', 'ð': 'd', 'ø': 'o', 'ĺ': 'l',
            'ŕ': 'r', 'ä': 'a', 'ľ': 'l', 'ć': 'c', 'ű': 'u',
            'ő': 'o', 'ç': 'c',
        };

        return str.replace(/[\u00C0-\u017F]/g, char => nonASCII[char] || char);
    };

    return (
        <div className={'shopping-list'}>
            <div>
                <ul>
                    {state.items
                        .sort((a, b) => b.quantity - a.quantity)
                        .map(item => (
                            <ShoppingItem key={item.name} item={item} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
                        ))}
                </ul>
                <div className={'add-item-form'}>
                    <input className={'add-item-input'} value={state.newItemName} onChange={handleNameChange} placeholder="Item name" />
                    <input className={'add-item-input'} type="number" value={state.newItemQuantity} onChange={handleQuantityChange} min="1" max="50" placeholder="Quantity" />
                    <button className={'add-item-button'} onClick={handleNewItem}>Add</button>
                </div>
            </div>
            <div>
                <button onClick={handleReset} className="reset-button">Reset</button>
            </div>
        </div>
    );
};

export default ShoppingListApp;