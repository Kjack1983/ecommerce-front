import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from './apiCore';
import { Checkbox } from './Checkbox';
import { prices } from './fixedPrices';
import RadioBox from './RadioBox';

const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters : {
            category: [],
            price: []
        }
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        })
    }

    useEffect(() => {
        init();
    },[]);

    const handleFilters = (filters, filterBy) => {
        let newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy === 'price') {
            let pricesValues = handlePrices(filters);
            newFilters.filters[filterBy] = pricesValues;
        }

        setMyFilters(newFilters)
    }

    const handlePrices = value => {
        const data = prices;

        let fetchRange = [];
        data.forEach((price, index) => {
            if(price._id === parseInt(value)) {
                fetchRange = price.array;
            }
        });

        return fetchRange

    }

    return (
        <Layout 
            title="Shop" 
            description="Search and find products of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter by category</h4>
                    <ul>
                        {/* handle Filter we need to return the filters */}
                        <Checkbox 
                            categories={categories}
                            handleFilters={filters => 
                                handleFilters(filters, 'category')
                            } 
                        />
                    </ul>
                    <h4>Filter by price</h4>
                    <ul>
                        {/* handle Filter we need to return the filters */}
                        <RadioBox 
                            prices={prices}
                            handleFilters={filters => 
                                handleFilters(filters, 'price')
                            } 
                        />
                    </ul>
                </div>
                <div className="col-8">
                    {JSON.stringify(myFilters)}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;
