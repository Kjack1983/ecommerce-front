import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { getCartItems, deleteItem } from './cartHelper';
import { Link } from 'react-router-dom';
import Card from './Card';
import { CardProvider } from './cardhandler/CardContext';
import Checkout from './Checkout';

const Cart = () => {
    
    const [items, setItems] = useState([]);

    const removeItem = (id) => {
        deleteItem(id);
        setItems(getCartItems());
    }

    useEffect(() => {
        setItems(getCartItems());
    }, [])

    const diplayItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => ( 
                    <CardProvider
                        key={i} 
                        product={product} 
                        showAddToCartBtn={false}
                        cartUpdate={true}
                        deleteBtn={true}
                    >
                    <Card 
                        key={i} 
                        product={product} 
                        showAddToCartBtn={false}
                        cartUpdate={true}
                        deleteBtn={true}
                        onRemoveItem={removeItem}
                    />
                    </CardProvider>
                ))}
            </div>
        )
    }

    const notItemsMessage = () => (
        <h2>
            Your cart is empty <br /> <Link to='/shop'>Continue Shopping</Link> 
        </h2>
    )

    return (
        <Layout 
            title="Shopping Cart" 
            description="Manage your cart items. Add remove checkout remove shopping." 
            headerClass="default" 
            className="container-fluid"
        >
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? diplayItems(items) : notItemsMessage()}
                </div>

                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <CardProvider products={items}>
                        <Checkout products={items} />
                    </CardProvider>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;