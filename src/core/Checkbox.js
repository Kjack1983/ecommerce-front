import React, { useState, useEffect } from 'react';

export const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([]);

	const handleToggle = categoryId => () => {

		let newCheckCategoryId = [...checked];

		let checkCategoryId = checked.indexOf(categoryId);

		if(!!~checkCategoryId) {
			newCheckCategoryId.splice(checkCategoryId, 1);
		} else {
			newCheckCategoryId.push(categoryId);
		}

		setChecked(newCheckCategoryId);
		handleFilters(newCheckCategoryId);
	}

    return categories.map((category, index) => (
        <li key={index} className="list-unstyled">
            <input onClick={handleToggle(category._id)} value={checked.indexOf(category._id)} type="checkbox" className="form-check-input"/>
            <label className="form-check-label">{category.name}</label>
        </li>
    ))
}
