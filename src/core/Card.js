import React from 'react';
import {Link} from 'react-router-dom';
import { ShowImage } from './ShowImage';
import moment from 'moment';

const Card = ({product, isProduct, showViewProductBtn = true}) => {

    const showViewBtn = (showViewProductBtn) => {
        return (
            showViewProductBtn && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mr-2 mb-2">
                        View Product
                    </button>
                </Link>
            )
        )
    }

    const showAddToCardButton = () => {
        return (
            <button className="btn btn-outline-warning mb-2">
                Add to card
            </button>
        )
    }

    const displayStock = quantity => (
        quantity > 0 ? (
            <div className="mb-2">
                <span className="badge badge-primary pill">in Stock</span>
            </div>
        ) : (
            <div className="mb-2">
                <span className="badge badge-primary pill">Out of stock</span>
            </div>
        )
    )

    return (
        <div className={!isProduct || typeof isProduct === 'undefined' ? 'd-flex mr-2' : ''}>
            <div className={!isProduct || typeof isProduct === 'undefined' ? 'card mb-2' : 'card product-view'}>
                <div className="card-header name">
                    <Link to={`/product/${product._id}`}>
                        {product.name}
                    </Link>
                </div>
                <div className="card-body">
                    <Link to={`/product/${product._id}`}>
                        <ShowImage item={product} url="product" />
                    </Link>
                    <p className="lead mt-2">
                        {product.description.substring(0, 100)}
                    </p>
                    <p className="black-10">Price: &euro;{product.price}</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
                    {displayStock(product.quantity)}
                    {showViewBtn(showViewProductBtn)}
                    {showAddToCardButton()}
                </div>
            </div>
        </div>
    )
}

export default Card;