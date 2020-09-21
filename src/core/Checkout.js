import React, { useState, useEffect, useContext } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import { CardContext } from './cardhandler/CardContext';

const Checkout = ({ products }) => {
    
    const context = useContext(CardContext);

    const { getTotal } = context;
    
    return (
        <div>
            <h2>
                Total: {getTotal()}&euro;
            </h2>
        </div>
    )
}

export default Checkout;