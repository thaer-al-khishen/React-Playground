import React from 'react';
import ReactDOM from 'react-dom';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return userGreeting;
}

// Using Variables:
const name = 'React';
const greeting = <h1>Hello, {name}!</h1>;

//Executing Functions:
//This is an arrow function
const getUserGreeting = (user: string) => `Welcome, ${user}!`;
const userGreeting = <h1>{getUserGreeting('Alice')}</h1>;

//This is a traditional function:
function getUserGreeting_v2(user: string) {
    return `Welcome, ${user}!`;
}

//Performing Calculations:
const result = <h2>{3 + 2}</h2>; // Outputs: 5

//Conditional Rendering:
//Using a ternary operator
const isLoggedIn = true;
const userStatus = (
    <h3>{isLoggedIn ? 'User is logged in' : 'User is not logged in'}</h3>
);

//Using Logical && Operator:
const notifications = 5;
const notificationMessage = (
    <div>{notifications > 0 && <p>You have {notifications} new notifications!</p>}</div>
);


export default App;
