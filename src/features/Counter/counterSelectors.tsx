// counterSelectors.tsx
import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../../store/Store";

const selectCounterState = (state: RootState) => state.counter;

export const selectCount = createSelector(
    [selectCounterState],
    (counter) => counter.count
);
