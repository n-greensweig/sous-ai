import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        // <Link to="/home">
            <header style={{
                 background: 'radial-gradient(circle, #F5F5F5, #DAA520)',
                color: '#333333',
                borderColor: 'white',
                textAlign: 'center',
                padding: '24px',
            }}>{props.text}</header>
        // </Link>
    )
}

export default Header;