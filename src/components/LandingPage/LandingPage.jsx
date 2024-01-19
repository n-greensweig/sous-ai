import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme, useMediaQuery } from "@mui/material";

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import TypewriterText from '../TypewriterText/TypewriterText';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const firstParagraphText = `Welcome to SousAI. Let's get cooking!`;

  const onLogin = (event) => {
    history.push('/login');
  };

  // Check the screen size for responsive design
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="container" style={{
      backgroundColor: '#F5F5F5',
      display: isXsScreen || isSmScreen ? 'flex' : null,
      flexDirection: isXsScreen || isSmScreen ? 'column' : null,
      alignItems: isXsScreen || isSmScreen ? 'center' : null,
    }}>
      <h2 style={{
        color: '#333', paddingLeft: isXsScreen || isSmScreen ? null : '10px'
      }}>{heading}</h2>

      <div className="grid" style={{
        display: isXsScreen || isSmScreen ? 'flex' : null,
        flexDirection: isXsScreen || isSmScreen ? 'column' : null,
        alignItems: isXsScreen || isSmScreen ? 'center' : null,
      }}>
        <div className="grid-col grid-col_8">
          <TypewriterText text={firstParagraphText} />
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4 style={{ color: '#f6f1eb' }}>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div >
  );
}

export default LandingPage;
