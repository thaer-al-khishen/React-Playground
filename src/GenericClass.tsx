export {}

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

// Using the StateManager for a number state
const numberState = new StateManager<number>(10);
console.log(numberState.getState()); // 10
numberState.setState(20);
console.log(numberState.getState()); // 20

// Using the StateManager for a string state
const stringState = new StateManager<string>("Hello");
console.log(stringState.getState()); // "Hello"
stringState.setState("World");
console.log(stringState.getState()); // "World"
