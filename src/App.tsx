import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <FetchPosts/>;
}

//Part 1: useContext for Global State Management
// Introduction to useContext:
//
// useContext is a hook that allows you to access data from a React context.
// It's used for passing data deeply through a component tree without having to pass props at every level.
// It can be used for global state management, theme settings, user authentication status, etc.
// Creating and Using Context:
//
// Create a context using React.createContext.
// Use the Provider to pass down the context value.
// Use useContext in a child component to access the context value.
const ThemeContext = React.createContext('light');

const Toolbar = () => {
    const theme = useContext(ThemeContext);
    return <div>{`Theme: ${theme}`}</div>;
};

const ContextAwareToolbar = () => (
    <ThemeContext.Provider value="dark">
        <Toolbar/>
    </ThemeContext.Provider>
);

//Part 2: useRef and useReducer
// useRef Hook:
//
// useRef returns a mutable ref object whose .current property is initialized to the passed argument.
// Common uses include accessing a DOM element directly, storing a mutable value that does not cause re-renders when changed.
// Example of using useRef to focus an input element.

function InputFocusExample() {
    const inputEl = useRef<HTMLInputElement>(null);

    const onButtonClick = () => {
        // `current` points to the mounted text input element
        // Check if `current` is not null before calling `focus`
        if (inputEl.current) {
            inputEl.current.focus();
        }
    };

    return (
        <>
            <input ref={inputEl} type="text"/>
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}

//In this example, useRef creates a reference (inputEl) to the input element.
// When the button is clicked, the onButtonClick function sets the focus to the input element using inputEl.current.focus().

// useReducer Hook:
//
// Introduce useReducer as an alternative to useState for managing complex state logic.
// Explain how it works similarly to reducers in Redux: it takes a reducer function and an initial state and returns the current state and a dispatch method.
// Show a basic example of useReducer for managing a counter's state.

// Define the type for the state
interface CounterState {
    count: number;
}

type CounterAction = {
    type: 'increment' | 'decrement';
};

function counterReducer(state: CounterState, action: CounterAction): CounterState {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
}

// Component
function Counter() {
    const [state, dispatch] = useReducer(counterReducer, {count: 0});

    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    );
}

//In TypeScript, both interfaces and types can often be used interchangeably for defining the shape of objects like component state and props.
// The choice between using an interface or a type alias often comes down to style preferences and specific use cases.
// Let's explore the considerations for each in the context of our CounterState and CounterAction.
//
// Using Interfaces
// Interfaces in TypeScript are typically used to define the shape of an object.
// They are extendable and can be merged, which makes them a great choice for defining component props and state
// when you expect them to be extended or combined with other interfaces.
//
//Using Types
// Type aliases are more versatile than interfaces in that they can represent a wider range of shapes, not just objects.
// They are a good choice when you need to use union types, intersection types, or tuples.
// In our case, using a type for the CounterAction is appropriate because you're defining a union type for the type property.


//Custom hooks:
//Custom hooks allow you to extract component logic into reusable functions.
//They help you share logic across different components.
const useFetch = <T, >(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);

    return {data, loading, error};
};

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    // other user fields
}

const FetchPosts = () => {
    const {data: posts, loading, error} = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <>
            <h1>Posts</h1>
            <ul>
                {posts && posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default App;
