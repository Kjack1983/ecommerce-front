import { LocalUrlParams }  from '../config';

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