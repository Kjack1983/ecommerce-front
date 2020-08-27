import React, { useState , useEffect, useRef } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    let form = useRef(null);

    const { user, token } = isAuthenticated();

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }

    useEffect(() => {
       init();
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({
            ...values,
            [name]: value
        });
    }

    const clickSubmit = event => {
        event.preventDefault();

        setValues({...values, error: '', loading: true});

        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({...values, createdProduct: '', error: data.error})
            } else {
                setValues({
                    ...values,
                    name: '',
                    description:'',
                    photo: '',
                    price:'',
                    quantity:'',
                    category: '',
                    shipping: '',
                    loading: false,
                    formData: new FormData,
                    createdProduct: data.name,  
                })
            }
        }).catch(err => console.log('ERROR >>>>', err));
    }

    const newPostForm = () => (
        <form ref={form} className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input 
                        type="file" 
                        onChange={handleChange('photo')} 
                        name="photo" 
                        accept="image/*"
                    />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Name</label>
                <input 
                    type="text" 
                    onChange={handleChange('name')} 
                    className="form-control" 
                    value={name}
                />
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Description</label>
                <textarea 
                    type="text" 
                    onChange={handleChange('description')} 
                    className="form-control" 
                    value={description}
                />
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Price</label>
                <input 
                    type="number" 
                    onChange={handleChange('price')} 
                    className="form-control" 
                    value={price}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select 
                    onChange={handleChange('category')} 
                    className="form-control"
                    value={category}
                >
                    <option>Please Select</option>
                    {categories && categories.map((category, index) => (
                        <option 
                            key={index} 
                            value={category._id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select 
                    onChange={handleChange('shipping')} 
                    className="form-control"
                    value={shipping}
                >
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="0">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Quantity</label>
                <input 
                    type="number" 
                    onChange={handleChange('quantity')} 
                    className="form-control" 
                    value={quantity}
                />
            </div>
            <button className="btn btn-outline-primary">Create product</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created</h2>
        </div>
    )

    const showLoading = () => loading && (
        <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )

    return (
        <Layout 
            title="Add a new product" 
            description={`G'day ${user.name}, ready to add a new product`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>

            
        </Layout>
    )
}

export default AddProduct;