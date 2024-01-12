import React, {useEffect, useState} from 'react';
import axios from "axios";

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <FetchPosts/>;
}

//npm install axios

//Fetching data from APIs is a common requirement in modern web applications.
// React itself doesn’t have a built-in way to fetch data from APIs, but it provides the tools to integrate these functionalities easily.
//Fetch is a native browser API for making HTTP requests.
const useFetch = <T, >(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);

    return {data, loading, error};
};

//Axios, a popular HTTP client library that provides more features than fetch.
const useAxios = <T, >(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Create an axios instance
        const axiosInstance = axios.create();

        // Request Interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use(config => {
            // Modify or log the request config
            console.log('Request sent:', config);
            return config;
        }, error => {
            // Handle request error
            return Promise.reject(error);
        });

        // Response Interceptor
        const responseInterceptor = axiosInstance.interceptors.response.use(response => {
            // Modify or log the response
            console.log('Response received:', response);
            return response;
        }, error => {
            // Handle response error
            return Promise.reject(error);
        });

        // Fetching data
        axiosInstance.get<T>(url)
            .then(response => setData(response.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false));

        // Cleanup function
        return () => {
            // Eject interceptors when component unmounts
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [url]);

    return { data, loading, error };
};

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    // other user fields
}

const FetchPosts = () => {
    const {data: posts, loading, error} = useAxios<Post[]>('https://jsonplaceholder.typicode.com/posts');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <>
            <h1>Posts</h1>
            <ul>
                {posts && posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

//Added Value of Using axios
// Automatic JSON Data Transformation: axios automatically transforms the response data into JSON, eliminating the need to manually parse response.json().
// Error Handling: axios provides a more straightforward way of handling errors. It treats any status code outside the range of 2xx as errors, which simplifies error handling logic.
// Request and Response Interceptors: axios allows you to intercept requests and responses to inject logic or modify request/response data.
// Cancellation: axios provides an easy way to cancel requests, which is useful for avoiding memory leaks in React components.
// Timeouts, Headers, and Custom Config: axios makes it easier to set timeouts, default headers, and other custom configurations.

export default App;
