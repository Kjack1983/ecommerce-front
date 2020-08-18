import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu';
import "../styles.css";
import Header from './Header';

const Layout = ({
    title = 'Title', 
    description = 'Description',
    headerClass,
    className,
    children
}) => (
    <div>
        <Menu />
        <Header 
            title={title} 
            className={headerClass ? headerClass : 'default'} 
            description={description} 
        />
        <div className={className}>{children}</div>
    </div>
)

Layout.propTypes = {
    title:  PropTypes.string,
    description: PropTypes.string
}

export default Layout
