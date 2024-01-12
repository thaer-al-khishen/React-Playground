// In a component
import React from 'react';
import useFormInput from './useFormInput';

const emailValidator = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const MyForm = () => {
    const emailInput = useFormInput({ initialValue: '', validate: emailValidator });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!emailInput.isValid) {
            alert('Please enter a valid email');
            return;
        }
        // Submit logic
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" {...emailInput} />
            {!emailInput.isValid && <p>Please enter a valid email.</p>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;