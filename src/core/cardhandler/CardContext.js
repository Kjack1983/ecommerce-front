import React, { createContext, useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';


export const CardContext = createContext({});

export const CardProvider = props => {

    let {
        product,
        products,
        isProduct, 
        showViewProductBtn, 
        showAddToCartBtn, 
        cartUpdate,
        deleteBtn,
        children 
    } = props;

    const getTotal = () => {
        if (typeof products !== 'undefined') {
            return products.reduce((currentValue, nextValue) => {
                return currentValue + nextValue.count * nextValue.price;
            }, 0);
        }
    }
    
    const addItem = (item, callback) => {
        let cart = [];

        if (typeof window !== 'undefined') {
            let localCart = localStorage.getItem('cart');
            if (localCart) {
                cart = JSON.parse(localCart);
            }

            cart.push({
                ...item,
                count: 1
            });

            cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
                return cart.find(p => p._id === id);
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            callback();
        }
    }

    const updateItem = (productId, count) => {
        let cart = []

        if (typeof window !== 'undefined') {
            let storedItems = localStorage.getItem('cart');
            if(storedItems) {
                cart = JSON.parse(storedItems);
            }
        }

        cart.map((product, i) => {
            if(product._id === productId) {
                cart[i].count = count;
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const deleteItem = (productId) => {
        let cart = []

        if (typeof window !== 'undefined') {
            let storedItems = localStorage.getItem('cart');
            if(storedItems) {
                cart = JSON.parse(storedItems);
            }
        }

        cart.map((product, i) => {
            if(product._id === productId) {
                cart.splice(i, 1);
            }
        })
    
        localStorage.setItem('cart', JSON.stringify(cart));
    
        return cart;
    }

    /**
     * Fetch items from stored cart.
     */
    const itemTotal = () => {
        if (typeof window !== 'undefined') {
            
            // fetch stored cart
            let cart = localStorage.getItem('cart');
            if (cart) {
                return JSON.parse(cart).length;
            }
        }
    
        return 0;
    }
    
    /**
     * Fetch items from stored cart.
     */
    const getCartItems = () => {
        if (typeof window !== 'undefined') {
            
            // fetch stored cart
            let cart = localStorage.getItem('cart');
            if (cart) {
                return JSON.parse(cart);
            }
        }
    
        return [];
    }

    const context = {
        getTotal,
		addItem,
		updateItem,
		deleteItem,
		itemTotal,
		getCartItems
    };
    
    return <CardContext.Provider value={context}>{children}</CardContext.Provider>
}

export const { CardConsumer } = CardContext;