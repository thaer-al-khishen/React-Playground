import React, {createContext, ReactNode, useContext, useReducer} from 'react';

export {}

type ThemeProviderProps = {
    children: ReactNode;
};

// Define the type for our state and actions
type CartState = {
    items: { id: number; name: string; quantity: number }[];
};

type Action =
    | { type: 'ADD_ITEM'; payload: { id: number; name: string } }
    | { type: 'REMOVE_ONE_ITEM'; payload: { id: number } }
    | { type: 'DELETE_ITEM'; payload: { id: number } };

// Reducer function
function cartReducer(state: CartState, action: Action): CartState {
    switch (action.type) {
        case 'ADD_ITEM':
            // Check if item is already in the cart
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                // Increase quantity
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            } else {
                // Add new item
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                };
            }
        case 'REMOVE_ONE_ITEM':
            const itemToRemoveOne = state.items.find(item => item.id === action.payload.id);
            if (itemToRemoveOne && itemToRemoveOne.quantity > 1) {
                // Decrease quantity by one
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
                    ),
                };
            } else {
                // Remove item if quantity is 1 or less
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.payload.id),
                };
            }
        case 'DELETE_ITEM':
            // Remove item regardless of quantity
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };
        default:
            return state;
    }
}

// Create the context
const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<Action>;
}>({
    state: { items: [] },
    dispatch: () => null,
});

// Provider component
const CartProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};


const AddToCartButton: React.FC<{ id: number; name: string }> = ({ id, name }) => {
    const { dispatch } = useContext(CartContext);

    const handleAdd = () => {
        dispatch({ type: 'ADD_ITEM', payload: { id, name } });
    };

    return (
        <button onClick={handleAdd}>Add to Cart</button>
    );
};

const CartItemList: React.FC = () => {
    const { state, dispatch } = useContext(CartContext);

    const handleRemoveOne = (id: number) => {
        dispatch({ type: 'REMOVE_ONE_ITEM', payload: { id } });
    };

    const handleDelete = (id: number) => {
        dispatch({ type: 'DELETE_ITEM', payload: { id } });
    };

    return (
        <ul>
            {state.items.map(item => (
                <li key={item.id}>
                    {item.name} (Quantity: {item.quantity})
                    <button onClick={() => handleRemoveOne(item.id)}>Remove One</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};
