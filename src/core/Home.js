import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    
    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data);
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data);
            }
        })
    }

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    },[])

    return (
        <Layout 
            title="Home" 
            description="Node react Ecommerce App" 
            headerClass="home" 
            className="container-fluid"
        >
            <Search />
            <h4 className="mt-3 mb-4">New Arrivals</h4>
            <div className="row justify-content-center">
                {productsByArrival.map((product, i) => ( 
                    <Card key={i} product={product}/>
                ))}
            </div>

            <h4 className="mt-3 mb-4">Best Sellers</h4>
            <div className="row justify-content-center">
                {productsBySell.map((product, i) => ( 
                    <Card key={i} product={product}/>
                ))}
            </div>

        </Layout>
    )
}

export default Home
