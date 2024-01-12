
import React from 'react';
import {Link, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import PrivatePage from "./PrivatePage";
import Home from "./Home";
import About from "./About";

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
                <Route path="/private" element={<PrivatePage />} />
            </Routes>
        </Router>
    );
}

export default SecureRouter;