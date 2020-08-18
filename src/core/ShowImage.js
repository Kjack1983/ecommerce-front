import React from 'react';
import { LocalUrlParams }  from '../config';


export const ShowImage = ({ item, url }) => {
    return (
        <div className="product-img">
            <img 
                src={`${LocalUrlParams.ApiUrl}/${url}/photo/${item._id}`} 
                alt={item.name} 
                className="mb-3 img-fluid"
            />
        </div>
    )
}
