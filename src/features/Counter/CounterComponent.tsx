// CounterComponent.tsx
import React from 'react';
import {Provider, useDispatch, useSelector} from "react-redux";
import { increment, decrement } from "./counterSlice";
import {AppDispatch, store} from "../../store/Store"; // Import AppState from the store
import { selectCount } from './counterSelectors';

export const CounterComponent = () => {
    // Access the count state from the counter slice
    const count = useSelector(selectCount);
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch here

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
};
