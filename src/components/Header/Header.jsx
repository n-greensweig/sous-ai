import React from 'react';
import { Link } from 'react-router-dom';
import sous from '../Sous/sous.png';

function Header() {
    return (
        <Link to="/home">
            <header style={{
                backgroundColor: 'orange',
                textAlign: 'center',
                padding: '24px',
            }}>SousAI</header>
        </Link>
    )
}

export default Header;