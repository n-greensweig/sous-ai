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


  const onLogin = (event) => {
    history.push('/login');
  };

  // Check the screen size for responsive design
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const firstParagraphText = isXsScreen || isSmScreen ? `Welcome to SousAI! Let's get cooking.` :
    `Welcome to SousAI, your partner in the kitchen for real, everyday cooking. 
  We understand that life can be busy, and sometimes all you need is a simple, tasty meal to bring a little comfort to your day. 
  Our app is here to help, offering personalized recipe suggestions that fit your lifestyle and preferences. 
  Whether you're cooking for one or for a crowd, we're here to guide you with practical, approachable advice. 
  Let's make cooking less about perfection and more about the joy of creating something nourishing and delicious. Grab your ingredients, and let's get started! 🍲👩‍🍳👨‍🍳`;

  return (
    <div className="container" style={{
      backgroundColor: '#F5F5F5',
      display: isXsScreen || isSmScreen ? 'flex' : null,
      flexDirection: isXsScreen || isSmScreen ? 'column' : null,
      alignItems: isXsScreen || isSmScreen ? 'center' : null,
    }}>
      <h2 style={{
        color: '#333', paddingLeft: isXsScreen || isSmScreen ? null : '10px',
        fontSize: isXsScreen || isSmScreen ? null : '54px',
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
