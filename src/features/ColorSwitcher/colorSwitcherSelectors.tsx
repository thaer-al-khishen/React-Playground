// counterSelectors.tsx
import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../../store/Store";

const selectColorSwitcherState = (state: RootState) => state.colorSwitcher;

export const selectColorSwitcher = createSelector(
    [selectColorSwitcherState],
    (colorSwitcher) => colorSwitcher.color
);
