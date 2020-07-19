import { LocalUrlParams }  from '../config';

/**
 * Send form user to the server with POST.
 * @param { object } user 
 */
export const signup = (user) => {

    return fetch(`${LocalUrlParams.ApiUrl}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(error => console.table(error))
}

/**
 * Sign in user.
 * @param { object } user 
 */
export const signin = (user) => {

    return fetch(`${LocalUrlParams.ApiUrl}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(error => console.table(error))
}

/**
 * Store user information in localstorage.
 * @param { object } data 
 * @param { function } callback 
 */
export const authenticate = (data, callback) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        if (typeof callback === 'function') {
            callback();
        }
    }
}

export const signout = (callback) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        
        // Redirect user.
        callback();

        fetch(`${LocalUrlParams.ApiUrl}/signout`, {
            method: 'GET'
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
}

export const isAuthenticated = () => {

    if (typeof window === 'undefined') {
        return false;
    }

    let storedUser = localStorage.getItem('jwt'); 

    if(storedUser) {
        return JSON.parse(storedUser);
    } else {
        return false;
    }

}