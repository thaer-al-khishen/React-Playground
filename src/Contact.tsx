// Contact.js
import React, { useState, useEffect } from 'react';

const Contact = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds delay

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div>Loading Contact Page...</div>;
    }

    return <h2>Contact Page</h2>;
};

export default Contact;
