// counterSelectors.tsx
import { createSelector } from '@reduxjs/toolkit';
import {AppState} from "../../store/Store";

const selectCounterState = (state: AppState) => state.counter;

export const selectCount = createSelector(
    [selectCounterState],
    (counter) => counter.count
);
