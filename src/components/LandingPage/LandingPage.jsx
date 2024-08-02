import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme, useMediaQuery } from "@mui/material";

// Import stylesheet for LandingPage component
import './LandingPage.css';

// Import custom components for registration form and typewriter effect text
import RegisterForm from '../RegisterForm/RegisterForm';
import TypewriterText from '../TypewriterText/TypewriterText';
import LoginPage from '../LoginPage/LoginPage';

function LandingPage() {
  // State hook for dynamic page heading
  const [heading, setHeading] = useState('Welcome');
  // Hook for programmatically navigating between routes
  const history = useHistory();

  // Function to navigate to the login page
  const onLogin = (event) => {
    history.push('/login');
  };

  // Use MUI theme and media queries for responsive design adjustments
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Determine the text for the first paragraph based on screen size
  const firstParagraphText = isXsScreen || isSmScreen ? `Welcome to SousAI! Let's get cooking.` :
    `Welcome to SousAI, your partner in the kitchen. We're here to help you find the perfect recipe for any occasion.`;

  return (
    <div className="container" style={{
      // Responsive styling for the container
      backgroundColor: '#ecece6',
      display: isXsScreen || isSmScreen ? 'flex' : null,
      flexDirection: isXsScreen || isSmScreen ? 'column' : null,
      alignItems: isXsScreen || isSmScreen ? 'center' : null,
      paddingBottom: isXsScreen || isSmScreen ? '20%' : null,
    }}>
      <h2 style={{
        // Responsive styling for the heading
        color: '#333', paddingLeft: isXsScreen || isSmScreen ? null : '10px',
        fontSize: isXsScreen || isSmScreen ? null : '54px',
      }}>{heading}</h2>

      <div className="grid" style={{
        // Responsive styling for the grid layout
        display: isXsScreen || isSmScreen ? 'flex' : null,
        flexDirection: isXsScreen || isSmScreen ? 'column' : null,
        alignItems: isXsScreen || isSmScreen ? 'center' : null,
      }}>
        <div className="grid-col grid-col_8">
          {/* Dynamic TypewriterText component displaying responsive text */}
          <TypewriterText text={firstParagraphText} />
        </div>
        <div className="grid-col grid-col_4">
          <LoginPage />
        </div>
      </div>
    </div >
  );
}

export default LandingPage;