import { LocalUrlParams }  from '../config';

/**
 * Send form user to the server with POST.
 * @param { object } user 
 */
export const createCategory = (userId, token, category) => {

    console.log(`Local parameter: ${LocalUrlParams.ApiUrl}`);

    return fetch(`${LocalUrlParams.ApiUrl}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => response.json())
    .catch(error => console.table(error))
}

/**
 * Send form user to the server with POST.
 * @param { object } user 
 */
export const createProduct = (userId, token, product) => {

    console.log(`Local parameter: ${LocalUrlParams.ApiUrl}`);

    return fetch(`${LocalUrlParams.ApiUrl}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: product // form data
    })
    .then(response => response.json())
    .catch(error => console.table(error))
}

export const getCategories = () => {
    return fetch(`${LocalUrlParams.ApiUrl}/categories`, {
        method: "GET"
    })
    .then(response => response.json())
    .catch(err => console.table(err));
}