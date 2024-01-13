// counterSelectors.tsx
import { createSelector } from '@reduxjs/toolkit';
import {AppState} from "../../store/Store";

const selectColorSwitcherState = (state: AppState) => state.colorSwitcher;

export const selectColorSwitcher = createSelector(
    [selectColorSwitcherState],
    (colorSwitcher) => colorSwitcher.color
);
