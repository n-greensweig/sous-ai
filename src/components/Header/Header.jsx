import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <Link to={props.to}>
            <header style={{
                background: 'radial-gradient(circle, #F5F5F5, #DAA520)',
                position: 'fixed',
                width: '100%',
                color: '#000000',
                borderColor: 'white',
                textAlign: 'center',
                padding: '24px',
                zIndex: 1000,
                top: 0,
            }}><strong>{props.text}</strong></header>
        </Link>
    )
}

export default Header;