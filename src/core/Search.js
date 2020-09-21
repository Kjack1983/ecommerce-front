import React, {useState, useEffect} from 'react';
import { getCategories, list } from './apiCore';
import Card from './Card';
import { CardProvider } from './cardhandler/CardContext';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({...data, categories: data})
            }
        })
    }

    useEffect(() => {
        loadCategories();
    }, [])

    const searchProducts = () => {
        if (search) {
            list({search: search || undefined, category: category })
            .then(response => {
                if (response.error) {
                    console.log('Response error', response.error);
                } else {
                    setData({ 
                        ...data, 
                        results: response, 
                        searched: true 
                    })
                }
            })
            .catch(err => console.log(err));
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        searchProducts();
    }

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length !== 0) {
            let found = (results.length === 1) ?' found' : 's found';
            return `${results.length} product` + found;
        }

        if (searched && results.length < 1) {
            return `No products found`;
        }
    }

    const displayProductsBysearch = (results = []) => {
        return (
            <div className="border-info justify-content-center">
                <h2 className="mb-4 mt-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row justify-content-center border-info">
                    {results.map((p, i) => (
                        <CardProvider
                            key={i} 
                            product={p}
                        >
                            <Card 
                                key={i} 
                                product={p} 
                            />
                        </CardProvider>
                    ))}
                </div>
            </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select 
                            className="btn mr2" 
                            onChange={handleChange('category')}
                        >
                            <option value="All">All</option>
                            {categories.map((c, index) => {
                                return <option 
                                    key={index} 
                                    value={c._id}>
                                        {c.name}
                                </option>
                            })}
                        </select>
                    </div>
                    <input 
                        type="search" 
                        className="form-control" 
                        onChange={handleChange('search')}
                        placeholder="Search by name"
                    />
                </div>
                <div className="btn input-group-append" style={{border:'none'}}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    )

    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
            </div>
            <div className="container-fluid mb-3">
                {displayProductsBysearch(results)}
            </div>
        </div>
    )
}

export default Search;