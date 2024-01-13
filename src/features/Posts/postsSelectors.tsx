// posts.tsx
import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../../store/Store";

export const selectPostsState = (state: RootState) => state.posts;
