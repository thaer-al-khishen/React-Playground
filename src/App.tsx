import React from 'react';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return buttonWithClickEvent;
}

//Static Attributes
const element = <div className="container" id="main">Content</div>;

//Dynamic Attributes
const isActive = true;
const dynamicElement = <div className={isActive ? 'active' : 'inactive'}>Content</div>;

//Inline CSS Styling
const divStyle = {
    color: 'blue',
    backgroundColor: 'lightgray',
};
const inlineStylingElement = <div style={divStyle}>Styled Content</div>;

//Dynamic Styling
const buttonStyle = {
    backgroundColor: isActive ? 'green' : 'red',
};
const button = <button style={buttonStyle}>Click Me</button>;

//Handling Events
const handleClick = () => {
    console.log('Button clicked');
};
const buttonWithClickEvent = <button onClick={handleClick}>Click Me</button>;


export default App;
