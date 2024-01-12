import React from 'react';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <BlogPostComponent/>;
}

// Component composition is a fundamental concept in React. It involves building smaller, reusable components and combining them to form more complex UIs.
const Header = () => <header>Header</header>;
const MainContent = () => <main>Main Content</main>;
const Footer = () => <footer>Footer</footer>;

//Can be used with <BasicComposition/>
const BasicComposition = () =>
    <div>
        <Header/>
        <MainContent/>
        <Footer/>
    </div>

//Can be used directly with BasicComposition_v2
const BasicComposition_v2 = (
    <div>
        <Header/>
        <MainContent/>
        <Footer/>
    </div>
);

//What are Props?
//Props (short for "properties") are a way of passing data from parent to child components. They are read-only and help in creating dynamic components.
const PropsHeader = (props: {title: string}) => <header>{props.title}</header>;
const PropsHeaderSetup = () => <PropsHeader title="Welcome to React!" />;

//Props with interfaces for type safety:
interface HeaderInput {
    title: string
}
const ModifiedPropsHeader = (props: HeaderInput) => <header>{props.title}</header>;
const ModifiedPropsHeaderSetup = () => <ModifiedPropsHeader title="Welcome to React!" />;

//Practical Example
interface Blog {
    title: string,
    content: string
}
const BlogPost = (props: Blog) => (
    <div>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
    </div>
);

const BlogPostComponent = () => (
    <BlogPost title="My First Post" content="This is the content of the blog post." />
);

export default App;
