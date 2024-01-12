// In a component
import React from 'react';
import useFetch from "./useFetchData";

interface User {
    id: number;
    name: string;
    // other user fields
}

const UserComponentHook = () => {
    const { data: user, loading, error } = useFetch<User>('https://jsonplaceholder.typicode.com/users/2');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>No user found.</div>;

    return (
        <div>
            <h1>{user.name}</h1>
            {/* Render other user details */}
        </div>
    );
};

export default UserComponentHook;