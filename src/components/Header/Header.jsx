import { useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom'; // Note: This import is unused and could be removed.
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

/**
 * Renders a header component that is responsive and navigates to a specified route when clicked.
 * 
 * @param {Object} props - Component props including navigation path and text.
 * @returns A header component or null based on screen size.
 */
function Header(props) {
    // Hook to programmatically navigate between routes
    const history = useHistory();

    // MUI theme hooks for responsive design
    const theme = useTheme();
    // Determines if the screen width is less than or equal to the size of extra-small devices
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    // Determines if the screen width is less than or equal to the size of small devices
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        // Conditionally renders the header based on screen size
        // Header is not rendered on extra-small and small devices
        isXsScreen || isSmScreen ? null :
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
                cursor: 'pointer',
            }}
            // Navigates to the path specified in 'props.to' when the header is clicked
            onClick={() => history.push(props.to)}
            >
            {/* Displays the header text passed through props, emphasized with <strong> */}
            <strong>{props.text}</strong></header>
    )
}

export default Header;