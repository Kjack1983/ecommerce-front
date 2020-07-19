import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu';

const Layout = ({
    title = 'Title', 
    description = 'Description',
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
)

Layout.propTypes = {
    title:  PropTypes.string,
    description: PropTypes.string
}

export default Layout
