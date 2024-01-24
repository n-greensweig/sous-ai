import { useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {

    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        isXsScreen || isSmScreen ? null :
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