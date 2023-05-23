export interface ShoppingItemProps {
    item: Item;
    handleIncrement: (itemName: string) => void;
    handleDecrement: (itemName: string) => void;
}

export interface ShoppingListAppProps {
    items: Item[];
}

export interface Item {
    name: string;
    quantity: number;
}

export interface ShoppingListAppState {
    items: Item[];
    newItemName: string;
    newItemQuantity: number;
}