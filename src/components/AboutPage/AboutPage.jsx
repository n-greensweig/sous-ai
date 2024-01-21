import React from 'react';
import Header from '../Header/Header';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div style={{ marginTop: '5%' }}>
      <Header text='About' to={'/about'} />
      <div className="container">
        <div>

          <h1>Welcome to SousAI</h1>
          <p>At SousAI, we believe that cooking is more than just preparing meals; it's an art, a science, and most importantly,
            a way to create lasting memories with those we cherish. Our app is designed to bring joy, creativity, and connection into your kitchen.
          </p>
          <h2>Our Mission</h2>
          <p>In a world where schedules are hectic and time is precious, we strive to make cooking a delightful experience.
            We aim to foster stronger bonds and unforgettable moments through the joy of cooking.
            Whether you're a novice or a culinary enthusiast, SousAI is here to guide you in creating mouth-watering dishes that spark conversations and deepen relationships.
          </p>
          <h2>The Magic of SousAI</h2>
          <p>SousAI is not just an app; it's your personal sous-chef powered by the latest AI technology. Our app generates unique and personalized recipes based on your preferences,
            dietary needs, and available ingredients. Imagine having a culinary expert in your pocket, ready to inspire you with creative meal ideas!</p>

          <h2>Key Features:</h2>
          <ol>
            <li><strong>Personalized Recipe Generation:</strong> Get tailored recipes that suit your taste buds, dietary restrictions, and pantry items.</li>
            <li><strong>Interactive Cooking Assistant:</strong> Step-by-step guidance to ensure your cooking process is smooth and enjoyable.</li>
            <li><strong>Memory Journal:</strong> Capture and share your culinary adventures and the special moments created around the dining table.</li>
          </ol>
          <h3>Our Vision</h3>
          <p>We envision a world where meals are an opportunity to connect, learn, and create joy. SousAI is aim to facilitate the warmth and love that comes from shared meals and conversations.</p>
          <h3>Contact Us</h3>
          <p>For support, feedback, or sharing your SousAI stories, contact us at ngreensweig@gmail.com.</p>

          <p style={{paddingBottom: '8%'}}>Cook, Connect, Cherish - with SousAI.</p>

        </div>
      </div>
    </div>
  );
}

export default AboutPage;
