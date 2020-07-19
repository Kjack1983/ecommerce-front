import React, { useState } from 'react'
import Layout from '../core/Layout';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth';


const Signin = () => {
    const [values, setValues] = useState({
        email: 'default@gmail.com',
        password: '111111',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, error, loading, redirectToReferrer } = values;
    const { user } =  isAuthenticated();

    const handleChange = name => event => {
        setValues({
            ...values, 
            error: false, 
            [name]: event.target.value
        })
    }

    const clickSubmit = (event) => {
        
        //prevent browser to reload
        event.preventDefault();
        setValues({...values, error: false, loading: true});

        /**
         * because the keys are the same with the values we can just write name instead of name: name
         */ 
        signin({email, password})
        .then(data => {
            if(data.error) {
               setValues({
                   ...values, 
                   error: data.error, 
                   loading: false
                })
            } else {
                // pass callback function to set the redirect and set the value.
                // if redirectToReferrer then redirect to home page.
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    })
                })
            }
        })
    }

    /**
     * SignUp form
     * @return { JSX } sign up form
     */
    const signUpForm = () => (
        <form action="">
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    type="email" 
                    onChange={handleChange('email')} 
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    type="password" 
                    onChange={handleChange('password')} 
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const redirectUser = () => {
        if(redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
            
        }
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const showLoading = () => 
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
    )
    

    return (
        <Layout 
            title="Signin" 
            description="Sign in to Node React Ecommerce"
            className="container col-md-6 offset-md-3"
        >
        {showLoading()}
        {showError()}
        {signUpForm()}
        {redirectUser()}
        </Layout>
    )
}

export default Signin
