import React from 'react'

const Header = ({ title, className, description }) => {
    return (
        <div className={`jumbotron ${className}`}>
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
    )
}

export default Header;