import React from 'react';
import ReactDOM from 'react-dom';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return element;
}

//This syntax creates a React element, which is a lightweight description of what to render.
const element = <div>Hello, World!</div>;

const name = 'React';
const greeting = <span>Welcome to {name}!</span>;

const header = <h1>My First React App</h1>;

//JSX elements can be nested inside each other, similar to HTML. This allows for creating complex UI structures.
// Example of nested elements:
const nestedElements = (
    <div>
        <h1>Title</h1>
        <p>This is a paragraph inside a div.</p>
    </div>
);

//More complex structures can be built using nested JSX. For example, a simple layout with a header, main content, and footer:
const pageLayout = (
    <div>
        <header>Header Section</header>
        <main>
            <h1>Main Title</h1>
            <p>Main content goes here.</p>
        </main>
        <footer>Footer Information</footer>
    </div>
);

ReactDOM.render(element, document.getElementById('root'));

//The DOM (Document Object Model) and ReactDOM are fundamental concepts in web development, especially in the context of React applications.
// Understanding these concepts is crucial for grasping how React works and interacts with the browser.
//
// What is the DOM?
// Definition: The DOM is an abstraction of a structured text document. In web development,
// it refers to the document model of HTML and XML documents. It represents the page so that programs can change the document structure, style, and content.
// The DOM represents the document as a tree of nodes and objects; this way, programming languages can interact with the page.
//
// Role in Web Development: When a web page is loaded, the browser creates a DOM of the page,
// which is an object-oriented representation of the HTML or XML document. It allows scripts (like JavaScript) to dynamically access
// and update the content, structure, and style of a document.


//What is ReactDOM?
// Definition: ReactDOM is a package in React that provides DOM-specific methods that can be used at the top level of a web app to enable an efficient way of managing DOM elements of the web page.
//
// Role in React Applications:
//
// ReactDOM.render(): The most common use of ReactDOM is ReactDOM.render(), which is used to render a single React component or element into the DOM. It takes two arguments: the React element or component to render and the DOM node to mount it to.
// Handling React Elements: React elements are plain objects describing what you want to appear on the screen in terms of the DOM nodes. ReactDOM takes care of updating the DOM to match the React elements.
// Virtual DOM: React creates a Virtual DOM in memory, which is a representation of the UI components. ReactDOM is responsible for updating the actual DOM to match the React components' state in the Virtual DOM. This process is known as reconciliation.
//
// What Does ReactDOM Offer?
// Efficient DOM Manipulation: ReactDOM optimizes the updates to the DOM to improve performance. It only updates parts of the DOM that have actually changed, which is more efficient than re-rendering the entire UI on every small change.
// Server-side Rendering: With ReactDOMServer, React can render components on the server, which can improve the performance of initial page loads and SEO.
// Integration with Other Libraries: ReactDOM allows React to be integrated into existing applications. You can use it to mount React components inside a non-React application.
export default App;
