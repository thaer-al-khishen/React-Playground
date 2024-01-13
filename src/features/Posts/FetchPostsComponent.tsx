// features/Posts/FetchPostsComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPosts} from "./postsSlice";
import type { RootState, AppDispatch } from '../../store/Store';
import {selectPostsState} from "./postsSelectors";

const PostsList = () => {
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch here
    const { entities: posts, loading, error } = useSelector(selectPostsState);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading === 'pending') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;
