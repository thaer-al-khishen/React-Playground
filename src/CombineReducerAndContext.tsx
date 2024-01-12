import React, {createContext, ReactNode, useContext, useReducer} from 'react';

export {}

type ThemeProviderProps = {
    children: ReactNode;
};

// Define the type for our state
type ListState = {
    items: string[];
};

// Define the actions for our reducer
type Action = { type: 'ADD_ITEM'; payload: string };

// Reducer function
function listReducer(state: ListState, action: Action): ListState {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, action.payload] };
        default:
            return state;
    }
}

// Create the context
const ListContext = createContext<{
    state: ListState;
    dispatch: React.Dispatch<Action>;
}>({
    state: { items: [] },
    dispatch: () => null,
});

// Provider component
const ListProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(listReducer, { items: [] });

    return (
        <ListContext.Provider value={{ state, dispatch }}>
            {children}
        </ListContext.Provider>
    );
};

const AddItemForm: React.FC = () => {
    const { dispatch } = useContext(ListContext);
    const [input, setInput] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: 'ADD_ITEM', payload: input });
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Add Item</button>
        </form>
    );
};

const ItemList: React.FC = () => {
    const { state } = useContext(ListContext);

    return (
        <ul>
            {state.items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
};

//Full Flow Explanation
// Initialization: When the app starts, ListProvider initializes the state using useReducer and provides the state and dispatch function via ListContext.Provider.
//
// Adding Items: In AddItemForm, when a user submits the form, it dispatches an 'ADD_ITEM' action. The listReducer responds to this action by adding the new item to the state.
//
// Displaying Items: ItemList subscribes to ListContext and receives the current list of items. Whenever the state updates (an item is added), ItemList automatically re-renders to display the updated list.
//
// State Sharing: The state and the ability to update it are shared across AddItemForm and ItemList through ListContext, despite these components being potentially distant in the component tree.