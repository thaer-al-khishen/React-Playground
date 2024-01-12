import React from 'react';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <Component_v3/>;
}

// Lesson 4: JSX Elements - Part 6: Fragments in React
// Introduction to Fragments
// What are Fragments?
//
//A React Fragment is a common pattern used for grouping multiple elements without adding extra nodes to the DOM.
//Fragments let you wrap a list of children without adding extra HTML elements like divs.
//Why Fragments?
//
//The problem Fragments solve: React components must return a single root element, but sometimes adding an extra element (like a div)
// to the DOM is unnecessary or undesirable, especially when working with CSS Grid or Flexbox.

//Fragments help keep the DOM cleaner and improve performance by reducing the number of nodes.

//Basic Usage with <React.Fragment>
const Component = () => (
    <React.Fragment>
        <h1>Title</h1>
        <p>Description here</p>
    </React.Fragment>
);

//Shorthand Syntax <>
const Component_v2 = () => (
    <>
        <h1>Title</h1>
        <p>Description 2 here</p>
    </>
);

//const items = ['Item 1', 'Item 2', 'Item 3'];
// const Component = () => (
//   <>
//     {items.map(item => (
//       <React.Fragment key={item}>
//         <h2>{item}</h2>
//         <p>Description for {item}</p>
//       </React.Fragment>
//     ))}
//   </>
// );

//When to Use Fragments
// Common Use Cases:
//
// In components that return multiple elements.
// When rendering lists, to avoid wrapping list items in unnecessary divs.
// In tables, where wrapping tr tags in a div would break the table structure.

//<React.Fragment> can accept a key attribute, useful when mapping a collection to an array of fragments – for example, in a list

const items = ['Item 1', 'Item 2', 'Item 3'];
const Component_v3 = () => (
    <>
        {items.map(item => (
            <React.Fragment key={item}>
                <h2>{item}</h2>
                <p>Description for {item}</p>
            </React.Fragment>
        ))}
    </>
);

export default App;
