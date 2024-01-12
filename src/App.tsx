import React, {useRef, useState} from 'react';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <ReusableFormComponent/>;
}

//Handling forms efficiently and validating user input are crucial aspects of modern web applications.
// React provides patterns like controlled and uncontrolled components to handle form inputs,
// and there are various strategies for validating data.

//Controlled Components:
//
// In controlled components, form data is handled by the state within the React component.
// The input's current value is always driven by the React state, and every state mutation will have an associated
// handler function.
const ControlledForm = () => {
    const [name, setName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <input type="text" value={name} onChange={handleChange} />
    );
};

//Uncontrolled Components:
//
// Uncontrolled components are ones where form data is handled by the DOM itself. They are similar to traditional HTML form inputs.
// Use useRef to get the form values from the DOM.
// Example of an uncontrolled component:
const UncontrolledForm = () => {
    const nameInput = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (nameInput.current) {
            alert(`A name was submitted: ${nameInput.current.value}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={nameInput} />
            <button type="submit">Submit</button>
        </form>
    );
};

const ControlledFormWithValidation = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateEmail = (email: string) => {
        if (!/\S+@\S+\.\S+/.test(email)) {
            return "Email is invalid";
        }
        return '';
    };

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        return '';
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        // Submit form logic here
        console.log('Form submitted:', { email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

// Define an interface for the component's props
interface ReusableFormProps {
    onSubmit: (inputValue: string) => void; // Adjust the type based on your needs
}
const ReusableForm = ({ onSubmit }: ReusableFormProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(inputValue);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

// Usage in an application
const ReusableFormComponent = () => {
    const handleFormSubmit = (inputValue: string) => {
        console.log('Form submitted with:', inputValue);
        // Additional submit logic here
    };

    return (
        <div>
            <h1>My App</h1>
            <ReusableForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default App;
