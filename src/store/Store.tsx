// Store.tsx
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../features/Counter/counterSlice";
import colorSwitcherReducer from '../features/ColorSwitcher/colorSwitcherSlice';
import postsReducer from '../features/Posts/postsSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        colorSwitcher: colorSwitcherReducer,
        posts: postsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
