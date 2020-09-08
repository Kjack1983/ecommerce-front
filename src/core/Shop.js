import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
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
    const [limit, setlimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        })
    }

    const loadFilterResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = () => {

        let toSkip = skip + limit;

        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load More
                </button>
            )
        )
    }

    useEffect(() => {
        init();
        loadFilterResults(skip, limit, myFilters.filters);
    },[]);

    const handleFilters = (filters, filterBy) => {
        let newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy === 'price') {
            let pricesValues = handlePrices(filters);
            newFilters.filters[filterBy] = pricesValues;
        }
        loadFilterResults(myFilters.filters);
        setMyFilters(newFilters)
    }

    const handlePrices = value => {
        const data = prices;

        let priceRange = [];
        data.forEach((price, index) => {
            if(price._id === parseInt(value)) {
                priceRange = price.array;
            }
        });

        return priceRange;
    }

    return (
        <Layout 
            title="Shop" 
            description="Search and find products of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-2">
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
                <div className="col-10">
                    <div className="row justify-content-center">
                        {filteredResults.map((product, i) => ( 
                            <Card key={i} product={product} isProduct={false} />
                        ))} 
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;
