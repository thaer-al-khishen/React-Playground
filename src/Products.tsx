// Products.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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

// ProductDetail.js
const ProductDetail = () => {
    let { productId } = useParams();
    return <h3>Details of Product {productId}</h3>;
};

interface RouteParams {
    productId: string;
}

const ProductDetail_v2: React.FC = () => {
    const params = useParams();
    const productId = params.productId; // TypeScript infers productId as string | undefined

    return <h3>Details of Product {productId}</h3>;
};

export { Products, ProductDetail };
