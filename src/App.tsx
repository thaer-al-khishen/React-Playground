import React, {createContext, ReactNode, useContext, useReducer} from 'react';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return (
        CartComponent
    );
}

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
//...state is used to create a new object with the same properties as the current state.
// This is crucial in React because state updates should be immutable.
// You should never modify the state directly but instead return a new object that represents the new state.
//Example: { ...state, items: updatedItems } creates a new state object with all the existing state properties, but with an updated items array.
//When dealing with arrays in the state, such as your items array, you often need to add, remove, or update elements in an immutable way. The spread syntax is used to create new arrays based on the existing one, with the necessary modifications.
// Example: [...state.items, newItem] creates a new array with all the elements of state.items, plus newItem added to the end.
// Example: state.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)
// creates a new array where the item with the matching id has its quantity incremented, while all other items remain unchanged.
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
                //In this case, if the item already exists in the cart, its quantity is increased.
                // The items array is recreated with the map function, where the matching item has its quantity updated.
            } else {
                // Add new item
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                };
                //Here, if the item doesn't exist in the cart, a new item is added.
                // The new state includes all the existing state properties (...state), and the items array is a new array
                // containing all the old items plus the new item.
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
            //Here, an item is removed from the cart. The filter function creates a new array that includes every item
            // except the one that needs to be removed.
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
const CartProvider = ({ children }: ThemeProviderProps) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

interface AddToCartProps {
    id: number;
    name: string
}
const AddToCartButton = ({ id, name }: AddToCartProps) => {
    const { dispatch } = useContext(CartContext);

    const handleAdd = () => {
        dispatch({ type: 'ADD_ITEM', payload: { id, name } });
    };

    return (
        <button onClick={handleAdd}>Add to Cart</button>
    );
};

const CartItemList = () => {
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

const CartComponent = (
    <CartProvider>
        <div>
            <h2>Products</h2>
            {/* Example products */}
            <div>
                <p>Product 1 <AddToCartButton id={1} name="Product 1" /></p>
                <p>Product 2 <AddToCartButton id={2} name="Product 2" /></p>
                <p>Product 3 <AddToCartButton id={3} name="Product 3" /></p>
            </div>

            <h2>Shopping Cart</h2>
            <CartItemList />
        </div>
    </CartProvider>
)

export default App;
