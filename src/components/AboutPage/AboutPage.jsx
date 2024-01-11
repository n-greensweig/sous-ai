import React from 'react';
import Header from '../Header/Header';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
      <Header text='About' />
      <div className="container">
        <div>
          <p>Introducing SousAI, your culinary companion in the digital age!
            Welcome to a world where creativity meets convenience, and every meal becomes a masterpiece.
            With SousAI, you're granted exclusive access to the culinary wonders of artificial intelligence.
            Imagine a kitchen assistant that crafts delicious recipes tailored to your taste buds,
            effortlessly generating a world of gastronomic possibilities.
            Beyond its recipe-generating prowess, SousAI offers you the unique ability to curate your own culinary journey.
            Save your favorite recipes to your personalized recipe box and unlock the power to leave your mark on each dish.
            Dive into the world of SousAI, where cooking evolves, and flavor knows no bounds. Join us in embracing the future of cooking!</p>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
