import React, {ComponentType, useEffect} from 'react';
import {Link, Route, BrowserRouter as Router, Routes, useNavigate} from "react-router-dom";

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <SecureRouter/>;
}

//Higher-Order Components (HOCs) are an advanced technique in React for reusing component logic.
// They are functions that take a component and return a new component, allowing you to add additional functionalities
// to existing components.

//Part 1: Understanding HOCs
// What are HOCs?
//
// HOCs are a pattern derived from React's compositional nature.
// They are similar to functions in JavaScript that return other functions, but in the context of components.
// Use Cases for HOCs:
//
// Enhancing components with additional props or state.
// Code reuse, logic and bootstrap abstraction.
// Conditional rendering, authentication checks, and more.
//
// Part 2: Creating an Authentication HOC
// Authentication HOC Example:
// HOCs can be used for authentication checks.
// The withAuth HOC wraps a component and adds authentication logic to it.
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

function SecureRouter() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/private">Private Page</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/private" element={<ProtectedPrivatePage />} />
            </Routes>
        </Router>
    );
}

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const PrivatePage= () => (
    <div>This is a private page only for authenticated users.</div>
);
const ProtectedPrivatePage = withAuth(PrivatePage);

//When exporting, you use: export default withAuth(PrivatePage);

export default App;
