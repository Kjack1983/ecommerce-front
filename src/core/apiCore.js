import { LocalUrlParams }  from '../config';

/**
 * Fetch all Products.
 */
export const getProducts = (sortBy) => {
    return fetch(`${LocalUrlParams.ApiUrl}/products?shortBy=${sortBy}&order=desc&limit=6`, {
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