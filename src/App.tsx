import React, {useEffect, useState} from 'react';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <Counter_v2/>;
}

//What are Functional Components?
//
// Functional components are a simpler way to write components that only contain a render method and don't have their own state or lifecycle methods
// (before the introduction of hooks).
// They are just JavaScript functions that return JSX.

//A simple functional component
// Define an interface for the component's props
interface GreetingProps {
    name: string;
}
//This is called de-structuring
const Greeting = ({ name }: GreetingProps) => <h1>Hello, {name}!</h1>;
//Advantages:
//
// The advantages of functional components include their simplicity, ease of testing, and how they help in writing cleaner and more understandable code.

//Part 2: Introduction to Hooks
// What are Hooks?
//
// Hooks are functions that let you “hook into” React state and lifecycle features from functional components.
// Hooks were introduced to enable state and other React features without writing a class.
// Why Hooks?
//
// Hooks were made to simplify component logic, make code more reusable, and to organize related logic more cohesively.

//Part 3: The useState Hook
// State in Functional Components:
//
// The useState hook allows you to add state to functional components.
const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};
//State and Re-rendering:
// Changing state via setCount triggers a re-render of the component.

//The useEffect Hook
// Side Effects in Functional Components:
//
// useEffect is a way to perform side effects in functional components.
// It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in class components.
// Basic Usage:
//
const Counter_v2 = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]); // Only re-run the effect if count changes

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};

//The dependency array in React's useEffect hook is a crucial concept for controlling when the effect function should run.
// Understanding how to use this array correctly is essential for optimizing your component's performance and avoiding unnecessary renders.
//
// What is the Dependency Array?
// Definition: The dependency array is an optional second argument to the useEffect hook. It's an array of dependencies that the effect relies on.
// Role: The dependencies you specify in the array determine when the useEffect callback should be re-executed.

//How the Dependency Array Controls the Effect
// No Dependency Array: If you don't provide a dependency array, the effect runs after every render of the component.
// useEffect(() => {
//     // This runs after EVERY render
// });

//Empty Dependency Array: If you provide an empty array ([]), the effect runs once after the initial render,
// similar to componentDidMount in class components.
// useEffect(() => {
//     // This runs once after the initial render
// }, []);

//Specified Dependencies: If you list specific values in the array, the effect runs after the initial render and then only if any of those values change.
// useEffect(() => {
//     // This runs after the initial render and then only if `dependency` changes
// }, [dependency]);

//When you define more than one dependency in the dependency array of a useEffect hook, the effect will re-run
// if at least one of the dependencies changes. The effect is not required to wait for all dependencies to change;
// a change in any single dependency is sufficient to trigger the effect.

//Why It's Important
// Performance Optimization: Proper use of the dependency array can prevent unnecessary effect executions, which is crucial for performance optimization, especially for effects that involve expensive operations like API calls or subscriptions.
// Avoiding Infinite Loops: Mismanagement of dependencies can lead to infinite loops. For instance, if an effect updates a state that it also depends on without proper conditions, it can trigger an endless cycle of re-renders.
// Ensuring Correct Behavior: The dependency array ensures that your effect always has access to the latest state and props. Without correctly specifying dependencies, your effect might close over stale state and props values.
// Common Mistakes and Best Practices
// Omitting Dependencies: A common mistake is to omit dependencies that are used inside the effect. This can lead to bugs where the effect uses stale values.
// Over-Specifying Dependencies: Conversely, specifying unnecessary dependencies can lead to excessive effect executions. It's important to include only the values that the effect actually relies on.
// Linting Tool: The ESLint plugin for React hooks (eslint-plugin-react-hooks) is a helpful tool for identifying missing or unnecessary dependencies.


export default App;
