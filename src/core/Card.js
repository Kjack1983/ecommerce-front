import React, { useState, useContext, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { ShowImage } from './ShowImage';
import moment from 'moment';
//import { addItem, updateItem } from './cartHelper';
import { CardContext } from './cardhandler/CardContext';

const Card = (props) => {

    let {
        product, 
        isProduct, 
        showViewProductBtn = true, 
        showAddToCartBtn = true, 
        cartUpdate = false,
        deleteBtn = false
    } = props;

    const context = useContext(CardContext);

	const { addItem, updateItem } = context;

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

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

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
     }

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCard = () => {
        return showAddToCartBtn && (
            <button onClick={addToCart} className="btn btn-outline-warning mb-2">
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

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);

        if(event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = (cartUpdate) => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        Update Quantity
                    </span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
            </div>
        </div>
    }

    const displayDeleteButton = (deleteBtn) => {
        return deleteBtn && (<button onClick={() => props.onRemoveItem(product._id)} className="btn btn-outline-danger mb-2">
            Delete Product
        </button>)
    }

    return (
        <div className={!isProduct || typeof isProduct === 'undefined' ? 'd-flex mr-2' : ''}>
            <div className={!isProduct || typeof isProduct === 'undefined' ? 'card mb-2' : 'card product-view'}>
                <div className="card-header name">
                    <Link to={`/product/${product._id}`}>
                        {product.name}
                    </Link>
                </div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
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
                    {showAddToCard()}
                    {displayDeleteButton(deleteBtn)}
                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
        </div>
    )
}

export default Card;