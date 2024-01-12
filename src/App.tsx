import React, {createContext, useContext, useEffect, useReducer, useState, ReactNode} from 'react';
import logo from './logo.svg';
import './App.css';
import Types from "./Types";
import TestTypes from "./Types";
import {AppRouter, NestedAppRouter} from "./Routing";
import {Posts, Posts_v2, PostMethodComponent, PostMethodComponent_v2} from "./Posts";
import {QueryClient, QueryClientProvider} from "react-query";
import PrivatePage from "./PrivatePage";
import PrivatePageRouter from "./PrivatePage";
import {BrowserRouter, Link, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import SecureRouter from "./SecureRouter";
import {UserComponent} from "./render_props/User";
import MyForm from "./custom_hooks/SelfValidatingForm";
import UserComponentHook from "./custom_hooks/UserComponent";
import ConditionalRenderer from "./render_props/ConditionalRenderer";

const queryClient = new QueryClient();

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    // console.log(getUser().data.name);
    // return <Counter_v2/>
    // return <ListProvider>
    //     <AddItemForm/>
    //     <ItemList/>
    // </ListProvider>;
    // return FetchDataComponent();
    // return (
    //     <CartProvider>
    //         <div>
    //             <h2>Products</h2>
    //             {/* Example products */}
    //             <div>
    //                 <p>Product 1 <AddToCartButton id={1} name="Product 1" /></p>
    //                 <p>Product 2 <AddToCartButton id={2} name="Product 2" /></p>
    //                 <p>Product 3 <AddToCartButton id={3} name="Product 3" /></p>
    //             </div>
    //
    //             <h2>Shopping Cart</h2>
    //             <CartItemList />
    //         </div>
    //     </CartProvider>
    // );
    // return <NestedAppRouter/>;
    // return <PostMethodComponent/>;
    // return (
    //     <QueryClientProvider client={queryClient}>
    //         <PostMethodComponent_v2/>;
    //     </QueryClientProvider>
    // );
    // return (
    //     <SecureRouter/>
    // );
    // return (
    //     <Router>
    //         <nav>
    //             <Link to="/">Home</Link>
    //             <Link to="/private">Private Page</Link>
    //         </nav>
    //         <Routes>
    //             <Route path="/" element={<Home />} />
    //             <Route path="/about" element={<About />} />
    //             <Route path="/private" element={<PrivatePage />} />
    //         </Routes>
    //     </Router>
    // );
    // return (
    //   <UserComponentHook/>
    // );
    return (
        <div>
            <ConditionalRenderer
                condition={true}
                render={() => <div>This will be rendered if the condition is true</div>}
            />
        </div>
    );
}

//1. JSX (JavaScript XML)
// In React, JSX allows you to write your UI components in a syntax similar to HTML. It's a syntactic sugar over React.createElement calls.
const element = <h1>Hello, world!</h1>;


// 2. Components
// Components in React are independent and reusable bits of code.
// They serve the same purpose as functions in JavaScript and composable functions in Jetpack Compose.
// Types of Components:
// Functional Components: These are simply JavaScript functions. They take props as an argument and return JSX.
// Class Components: These are more traditional React components defined using ES6 classes but are less common with the introduction of Hooks.
function Welcome(props: { name: string, age: number }) {
    //3. Props
    // Props in React are how you pass data to components. They are similar to parameters in a function.
    return <h1>Hello, {props.name} with the age of {props.age}</h1>;
}


//4. State
// State in React is used for data that changes over time. The useState hook is a way to add state to functional components.
// Jetpack Compose Parallel: This is similar to using state in Compose, like remember and mutableStateOf.

// React
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

//The useState hook is incredibly versatile.
//Beyond simple counters, it can manage various types of state, including strings, arrays, objects, and more.
// 1. Toggling a Boolean State
// This is useful for toggling UI elements, like opening/closing a modal, showing/hiding a password, etc.
function ToggleComponent() {
    const [isToggled, setIsToggled] = useState(false);

    //This is the text being manipulated: {isToggled ? 'Hide' : 'Show'}
    //Show the content according to a condition: {isToggled && <div>Content to toggle</div>}
    return (
        <div>
            <button onClick={() => setIsToggled(!isToggled)}>
                {isToggled ? 'Hide' : 'Show'}
            </button>
            {isToggled && <div>Content to toggle</div>}
        </div>
    );
}

//2. Managing an Array
// You can use state to manage arrays, which is useful for lists, data collections, etc.
function ListComponent() {
    const [items, setItems] = useState<string[]>([]);

    const addItem = (item: string) => {
        setItems([...items, item]);
    };

    return (
        <div>
            <button onClick={() => addItem('New Item')}>Add Item</button>
            {items.map((item, index) => <div key={index}>{item}</div>)}
        </div>
    );
}

//3. Handling Form Inputs
// State is often used to track the value of form inputs.
function FormComponent() {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <input type="text" value={inputValue} onChange={handleChange}/>
    );
}

//4. Complex State Logic
// For more complex state logic, you might use an object. This is useful for managing multiple related states.
function ComplexForm() {
    const [formState, setFormState] = useState({name: '', age: ''});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };

    return (
        <form>
            <input
                name="name"
                value={formState.name}
                onChange={handleChange}
            />
            <input
                name="age"
                type="number"
                value={formState.age}
                onChange={handleChange}
            />
        </form>
    );
}

//Practical Use Cases for useEffect
// useEffect is used to perform side effects in your components. These side effects could be data fetching, subscriptions, manually changing the DOM, and more.
//
// 1. Fetching Data
// Fetching data from an API when the component mounts.
function FetchDataComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(data => setData(data));
    }, []); // The empty array means it runs once on mount

    return <div>{JSON.stringify(data)}</div>;
}

//2. Adding Event Listeners
// Setting up a subscription or event listener.
function ResizeComponent() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Cleanup function When the component unmounts, or before the effect runs again,
        // the cleanup function is executed to remove the event listener.
        // This is important to avoid memory leaks.
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures this runs once on mount

    return <div>Window width: {windowWidth}</div>;
}


//3. Timer or Interval
// Setting up a timer or interval.
function TimerComponent() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []); // Empty array ensures this runs once on mount

    return <div>Timer: {seconds}</div>;
}


//4. Watching for Changes
// Executing an effect in response to a state change.
function WatchCount() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count > 5) {
            alert("Count is greater than 5!");
        }
    }, [count]); // This runs whenever `count` changes

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

function OldAppCode() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}


//TEST
interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

// Using the generic interface for a user response
function getUser(): ApiResponse<User> {
    // API call logic...
    return {
        status: 200,
        message: "Success",
        data: {id: 1, name: "John Doe"} // User type data
    };
}

// User type
interface User {
    id: number;
    name: string;
}


class StateManager<T> {
    private state: T;

    constructor(initialState: T) {
        this.state = initialState;
    }

    getState(): T {
        return this.state;
    }

    setState(newState: T): void {
        this.state = newState;
    }
}


// Define the type for your props
//Functional Component with Props
interface GreetingProps {
    name: string;
}

// Apply the type to your functional component
const Greeting: React.FC<GreetingProps> = ({name}) => {
    return <h1>Hello, {name}</h1>;
};


//Typing Props
// Props are typed using interfaces or types. This provides autocomplete and type checking when using the component.
// Example: Component with Optional Props
interface UserProps {
    id: number;
    name: string;
    email?: string; // Optional prop
}

const User: React.FC<UserProps> = ({id, name, email}) => {
    return (
        <div>
            <p>ID: {id}</p>
            <p>Name: {name}</p>
            {email && <p>Email: {email}</p>}
        </div>
    );
};


//Typing State
// When using the useState hook, TypeScript can often infer the type based on the initial value. However, you can also explicitly set the type.
// Example: useState with TypeScript
const Counter_v2: React.FC = () => {
    // TypeScript infers state type from the initial value (number)
    const [count, setCount] = useState(0);

    // Explicitly setting the type
    const [name, setName] = useState<string>("");

    return (
        // JSX
        <h1>{count}</h1>
    );
};


const Form: React.FC = () => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(inputValue);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    )
};


type CounterState = {
    count: number;
};

type UpdateAction = {
    type: 'increment' | 'decrement';
    payload: number;
};

function reducer(state: CounterState, action: UpdateAction): CounterState {
    switch (action.type) {
        case 'increment':
            return {count: state.count + action.payload};
        case 'decrement':
            return {count: state.count - action.payload};
        default:
            return state;
    }
}

const Counter_v3: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, {count: 0});

    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'increment', payload: 1})}>
                Increment
            </button>
            <button onClick={() => dispatch({type: 'decrement', payload: 1})}>
                Decrement
            </button>
        </div>
    );
};


const ThemeContext = createContext({
    theme: 'light', toggleTheme: () => {
    }
});

type ThemeProviderProps = {
    children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

const ThemedButton: React.FC = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Current Theme: {theme}
        </button>
    );
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
            return {...state, items: [...state.items, action.payload]};
        default:
            return state;
    }
}

// Create the context
const ListContext = createContext<{
    state: ListState;
    dispatch: React.Dispatch<Action>;
}>({
    state: {items: []},
    dispatch: () => null,
});

// Provider component
const ListProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(listReducer, {items: []});

    return (
        <ListContext.Provider value={{state, dispatch}}>
            {children}
        </ListContext.Provider>
    );
};

const AddItemForm: React.FC = () => {
    const {dispatch} = useContext(ListContext);
    const [input, setInput] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({type: 'ADD_ITEM', payload: input});
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
    const {state} = useContext(ListContext);

    return (
        <ul>
            {state.items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
};



// Define the type for our state and actions
type CartState = {
    items: { id: number; name: string; quantity: number }[];
};

type Action_v2 =
    | { type: 'ADD_ITEM'; payload: { id: number; name: string } }
    | { type: 'REMOVE_ONE_ITEM'; payload: { id: number } }
    | { type: 'DELETE_ITEM'; payload: { id: number } };

// Reducer function
function cartReducer(state: CartState, action: Action_v2): CartState {
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
    dispatch: React.Dispatch<Action_v2>;
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


export default App;
