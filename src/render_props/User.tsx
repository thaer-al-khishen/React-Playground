import React, { useState, useEffect } from 'react';
import type {JSX} from 'react'

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    // Add other relevant fields
}

interface UserDataFetcherProps {
    render: (data: { loading: boolean; error: Error | null; data: User | null }) => JSX.Element;
}

const UserDataFetcher: React.FC<UserDataFetcherProps> = ({ render }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((userData: User) => {
                setData(userData);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return render({ loading, error, data });
};

const UserComponent = () => (
    <UserDataFetcher render={({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        if (!data) return <div>No user data found.</div>;

        return (
            <div>
                <h1>{data.name}</h1>
                <p>Username: {data.username}</p>
                <p>Email: {data.email}</p>
                {/* Render other user data as needed */}
            </div>
        );
    }} />
);

export {UserDataFetcher, UserComponent};
