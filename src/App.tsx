import React from 'react';
import ShoppingListApp from './components/ShoppingListApp';

function App() {
    const items = [
        { name: 'Banana', quantity: 15 },
        { name: 'Egg', quantity: 13 },
        { name: 'Apple', quantity: 13 },
    ];

    return (
        <div className="App">
            <ShoppingListApp items={items} />
        </div>
    );
}

export default App;