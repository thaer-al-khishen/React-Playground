// withAuth.tsx
import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => {
        const navigate = useNavigate();
        const isAuthenticated = false; // Replace with actual authentication logic

        useEffect(() => {
            if (!isAuthenticated) {
                navigate('/about');
            }
        }, [isAuthenticated, navigate]);

        if (!isAuthenticated) {
            // Optionally, return a loading indicator or null while waiting for the effect to run
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
