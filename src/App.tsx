import React from 'react';
import {BrowserRouter as Router, Link, Outlet, Route, Routes, useParams} from 'react-router-dom';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <NestedAppRouter/>;
}

//Install router package: npm install react-router-dom

//This syntax creates a React element, which is a lightweight description of what to render.
const SimpleRouter = () => {
    return <Router>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
        <Routes>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </Router>;
}

const Home = () => <h2>About Page</h2>;
const About = () => <h2>Home Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

//You can move the links into another component
const Navigation = () => (
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/contact">Contact us</Link>
        </li>
    </ul>
);

const CustomizableRouter = () => {
    return <Router>
        <Navigation/>
        <Routes>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </Router>;
}

const NestedAppRouter = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/products" element={<Products/>}>
                        <Route path=":productId" element={<ProductDetail/>}/>
                    </Route>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </Router>
    );
}

const Products = () => {
    return (
        <div>
            <h2>Products</h2>
            <nav>
                <Link to="1">Product 1</Link> |{" "}
                <Link to="2">Product 2</Link> |{" "}
                <Link to="3">Product 3</Link>
            </nav>
            <Outlet /> {/* Where nested routes will render */}
        </div>
    );
};

const ProductDetail = () => {
    // const params = useParams();
    // const productId = params.productId; // TypeScript infers productId as string | undefined
    //Alternatively, you could do:
    const {productId} = useParams();
    return <h3>Details of Product {productId}</h3>;
};

const NotFound = () => {
    return <h2>404 - Page Not Found</h2>;
};

export default App;
