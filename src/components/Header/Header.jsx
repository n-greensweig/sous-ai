import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Link to="/home">
            <header style={{
                backgroundColor: '#FFA500',
                color: 'white',
                borderColor: 'white',
                textAlign: 'center',
                padding: '24px',
            }}>SousAI</header>
        </Link>
    )
}

export default Header;