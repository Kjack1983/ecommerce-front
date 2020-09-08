import { LocalUrlParams }  from '../config';
import queryString from 'query-string';
/**
 * Fetch all Products.
 */
export const getProducts = (sortBy) => {
    return fetch(`${LocalUrlParams.ApiUrl}/products?shortBy=${sortBy}&order=desc&limit=15`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

/**
 * Fetch all categories
 */
export const getCategories = () => {
    return fetch(`${LocalUrlParams.ApiUrl}/categories`, {
        method: "GET"
    })
    .then(response => response.json())
    .catch(err => console.table(err));
}

/**
 * Filter Products.
 * @param { number } skip
 * @param { number } limit
 * @param { object } filters
 */
export const getFilteredProducts = (skip, limit, filters = {}) => {

    const data = {
        limit, 
        skip, 
        filters
    }

    return fetch(`${LocalUrlParams.ApiUrl}/products/by/search/`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => console.table(error))
}

export const list = params => {
    const query = queryString.stringify(params);
    
    return fetch(`${LocalUrlParams.ApiUrl}/products/search?${query}`, {
        method: "GET"
    })
    .then(response => {
        console.log(response);
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

/**
 * Fetch all categories
 */
export const read = (productId) => {
    return fetch(`${LocalUrlParams.ApiUrl}/product/${productId}`, {
        method: "GET"
    })
    .then(response => response.json())
    .catch(err => console.table(err));
}

/**
 * Fetch all categories
 */
export const listRelated = (productId) => {
    return fetch(`${LocalUrlParams.ApiUrl}/product/related/${productId}`, {
        method: "GET"
    })
    .then(response => response.json())
    .catch(err => console.table(err));
}