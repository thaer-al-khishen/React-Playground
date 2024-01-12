import React from 'react';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <Counter/>;
}

//Introduction to State: State is an integral part of React components, allowing them to maintain internal data that changes over time.
// Using State in Class Components: Initialize state in the constructor and update state using this.setState().
// Discuss the asynchronous nature of setState().

// Define an interface for the component's state
interface CounterState {
    count: number;
}

// Define an interface for the component's props
// If there are no props, you can use an empty interface
interface CounterProps {}

class Counter extends React.Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
        super(props);
        this.state = { count: 0 };
    }

    componentDidMount() {
        console.log('Component mounted:', this.state.count);
    }

    componentDidUpdate(state: CounterState) {
        console.log('Component update:', this.state.count);
    }

    componentWillUnmount() {
        console.log('Component unmounting:', this.state.count);
    }

    increment = () => {
        // this.setState({ count: this.state.count + 1 });
        //You can make use of a callback that ensures this state is updated
        this.setState({ count: this.state.count + 1 }, () => {
            console.log('Count updated:', this.state.count);
        });
    };

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}

//What is setState()?: In class components, setState() is the primary method used to update the component's state and re-render the component.
// Asynchronous Operation: Emphasize that setState() is asynchronous.
// React batches state updates for performance reasons, meaning setState() does not immediately update the component state.
//
// Implications of Asynchronicity
// Batching: Multiple setState() calls within the same event loop are batched, leading to a single re-render for performance optimization.
// Accessing Updated State: Since setState() is asynchronous, the updated state may not be immediately available.
// If you need to perform an action immediately after setting the state, use the callback function provided by setState().
// this.setState({ count: this.state.count + 1 }, () => {
//     console.log('Count updated:', this.state.count);
// });

//Part 2: Lifecycle Methods
// Understanding Lifecycle Methods
// Lifecycle Overview: Lifecycle methods are special methods in class components that get called at different stages of a component's life: mounting, updating, and unmounting.
// Purpose: These methods are used for various purposes like API calls, setting up subscriptions, timers, and cleaning up resources.

//Common Lifecycle Methods:
// componentDidMount:
//
// Called once after the component is mounted (inserted into the tree).
// Use for initializing data-fetching, adding event listeners, or starting animations.
// Example: Fetching data from an API.
// componentDidMount() {
//     fetch('https://api.example.com/items')
//         .then(response => response.json())
//         .then(data => this.setState({ data }));
// }

//componentDidUpdate:
//
// Called after any update to the component (state or props changes).
// Use for updating external libraries, requesting new data, or performing DOM operations based on state changes.
// Example: Updating a chart based on new props.
// componentDidUpdate(prevProps) {
//     if (this.props.data !== prevProps.data) {
//         this.updateChart(this.props.data);
//     }
// }

//componentWillUnmount:
//
// Called right before the component is unmounted and destroyed.
// Use for cleanup actions like invalidating timers, canceling network requests, or removing event listeners.
// Example: Clearing a timer.
// componentWillUnmount() {
//     clearInterval(this.timerID);
// }
export default App;
