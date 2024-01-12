import React, { useReducer } from 'react';

export {}

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
            return { count: state.count + action.payload };
        case 'decrement':
            return { count: state.count - action.payload };
        default:
            return state;
    }
}

const Counter: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment', payload: 1 })}>
                Increment
            </button>
            <button onClick={() => dispatch({ type: 'decrement', payload: 1 })}>
                Decrement
            </button>
        </div>
    );
};

//Compose equivalent:

// State for the Counter
// data class CounterState(val count: Int)
//
// // Actions for updating the state
// sealed class CounterAction {
//     object Increment : CounterAction()
//     object Decrement : CounterAction()
// }
//
// @Composable
// fun Counter(
//     state: CounterState,
//     onIncrement: () -> Unit,
//     onDecrement: () -> Unit
// ) {
//     Column {
//         Text("Count: ${state.count}")
//         Button(onClick = onIncrement) {
//             Text("Increment")
//         }
//         Button(onClick = onDecrement) {
//             Text("Decrement")
//         }
//     }
// }
//
// @Composable
// fun CounterScreen() {
//     var state by remember { mutableStateOf(CounterState(0)) }
//
//     val onIncrement = { state = state.copy(count = state.count + 1) }
//     val onDecrement = { state = state.copy(count = state.count - 1) }
//
//     Counter(state, onIncrement, onDecrement)
// }