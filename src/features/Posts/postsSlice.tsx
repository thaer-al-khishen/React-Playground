// features/Posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for fetching posts
export interface PostsState {
    entities: Post[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;  // Allow 'error' to be string or null
}

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    // other user fields
}

// Define the initial state
const initialState: PostsState = {
    entities: [],
    loading: 'idle',
    error: null, // Initialize error as null
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    }
);

// Create a slice that includes the fetched posts
const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.entities = action.payload;
                state.loading = 'idle';
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.error = action.error.message ?? 'An error occurred';
                state.loading = 'idle';
            });
    },
});

export default postsSlice.reducer;
