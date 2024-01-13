// Store.tsx
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../features/Counter/counterSlice";
import colorSwitcherReducer from '../features/ColorSwitcher/colorSwitcherSlice';


// Define the AppState type based on the state structure
export type AppState = {
    counter: {
        count: number;
    };
    colorSwitcher: {
        color: string;
    };
    // ... other state slices if any
};

export const store = configureStore({
    reducer: {
        counter: counterReducer, // Use the slice reducer here
        colorSwitcher: colorSwitcherReducer,
    },
});
