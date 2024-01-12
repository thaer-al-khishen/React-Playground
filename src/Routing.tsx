import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import React, {ComponentType, lazy, Suspense} from 'react';

import Home from './Home';
import About from './About';
import NotFound from './NotFound';
import {ProductDetail, Products} from "./Products";

const Contact: ComponentType<any> = lazy(() => import('./Contact'));

function AppRouter() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
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
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </div>
            </Suspense>
        </Router>
    );
}

function NestedAppRouter() {
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

export {AppRouter, NestedAppRouter};
