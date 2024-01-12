import React, { useState, useEffect } from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]); // Use the Post interface here
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

interface Post {
    id: number;
    title: string;
    // Include other fields from the API if necessary, like 'body', 'userId', etc.
}

const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json() as Promise<Post[]>; // Cast the response to Promise<Post[]>
};

const Posts_v2 = () => {
    const { data: posts, isLoading, error } = useQuery<Post[], Error>('posts', fetchPosts);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts?.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

//For post methods:

interface NewPost {
    title: string;
    body: string;
    userId: number;
}

const createPost = async (newPost: NewPost) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

// Usage in a component
const PostMethodComponent = () => {
    const handleSubmit = async () => {
        try {
            const newPost = { title: 'My New Post', body: 'This is my post.', userId: 1 };
            const data = await createPost(newPost);
            console.log('Post created:', data);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <button onClick={handleSubmit}>Create Post</button>
    );
};

//Using React Query

interface PostResponse {
    id: number;
    title: string;
    body: string;
    userId: number;
    // Include other fields that might be in the response
}

const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation<PostResponse, Error, NewPost>(createPost, {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

// Usage in a component
const PostMethodComponent_v2 = () => {
    const createPostMutation = useCreatePost();

    const handleSubmit = () => {
        const newPost = { title: 'My New Post', body: 'This is my post.', userId: 1 };
        createPostMutation.mutate(newPost);
    };

    return (
        <div>
            <button onClick={handleSubmit} disabled={createPostMutation.isLoading}>
                {createPostMutation.isLoading ? 'Creating...' : 'Create Post'}
            </button>
            {createPostMutation.isError && (
                <div>Error: {(createPostMutation.error as Error).message}</div>
            )}
            {createPostMutation.isSuccess && createPostMutation.data && (
                <div>
                    <h3>Post Created Successfully</h3>
                    <p>Title: {createPostMutation.data.title}</p>
                    <p>Body: {createPostMutation.data.body}</p>
                </div>
            )}
        </div>
    );
};

export {Posts, Posts_v2, PostMethodComponent, PostMethodComponent_v2};
