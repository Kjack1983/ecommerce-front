import { LocalUrlParams }  from '../config';

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

    console.log('limit :>> ', limit);

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