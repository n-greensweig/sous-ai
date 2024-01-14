import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import TypewriterText from '../TypewriterText/TypewriterText';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const firstParagraphText = `Introducing SousAI, your culinary companion in the digital age! 
  Welcome to a world where creativity meets convenience, and every meal becomes a masterpiece. 
  With SousAI, you're granted exclusive access to the culinary wonders of artificial intelligence. 
  Imagine a kitchen assistant that crafts delicious recipes tailored to your taste buds, 
  effortlessly generating a world of gastronomic possibilities. 
  Beyond its recipe-generating prowess, SousAI offers you the unique ability to curate your own culinary journey. 
  Save your favorite recipes to your personalized recipe box and unlock the power to leave your mark on each dish. 
  Dive into the world of SousAI, where cooking evolves, and flavor knows no bounds. Join us in embracing the future of cooking!`;

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container" style={{ backgroundColor: '#333' }}>
      <h2 style={{color: '#f6f1eb'}}>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <TypewriterText text={firstParagraphText} />
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4 style={{color: '#f6f1eb'}}>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
