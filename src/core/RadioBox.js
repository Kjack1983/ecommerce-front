import React, { useState, useEffect } from 'react';

const RadioBox = ({ prices, handleFilters }) => {

    const [values, setValues] = useState(0);

    const handleChange = (event) => {
        console.log(event.target.value);
        handleFilters(event.target.value);
        setValues(event.target.value);

    }
    
    return prices.map((price, index) => (
        <div key={index}>
            <input 
                onChange={handleChange} 
                value={`${price._id}`} 
                type="radio"
                name={price}
                className="mr-2"
            />
            <label className="form-check-label">{`${price.name}`}</label>
        </div>
    ))
}

export default RadioBox;