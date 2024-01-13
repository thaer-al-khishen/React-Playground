// counterSlice.tsx
import {createSlice} from "@reduxjs/toolkit";

const initialState: CounterState = {count: 0};

type CounterState = {
    count: number;
};

// Create a slice for the counter
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.count += 1;
        },
        decrement: state => {
            state.count -= 1;
        }
    }
});

export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;
