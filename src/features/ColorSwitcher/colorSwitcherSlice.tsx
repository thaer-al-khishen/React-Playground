//colorSwitcherSlice.tsx
import { createSlice } from '@reduxjs/toolkit';

const initialState: ColorState = {
    color: 'red', // default color
};

type ColorState = {
    color: string;
};

export const colorSwitcherSlice = createSlice({
    name: 'colorSwitcher',
    initialState,
    reducers: {
        setColor: (state, action) => {
            state.color = action.payload;
        },
    },
});

export const { setColor } = colorSwitcherSlice.actions;
export default colorSwitcherSlice.reducer;
