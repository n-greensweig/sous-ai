import Header from '../Header/Header';
import './AboutPage.css';
function AboutPage() {
  return (
    <div className='about__container-wrapper'>
      <Header text='About' to={'/about'} />
      <div className="container">
        <div>

          <h1>Welcome to SousAI</h1>
          <p>At SousAI, we believe that cooking is an art, a science, and most importantly,
            a way to create lasting memories with those we cherish. SousAI is designed to bring joy, creativity, and connection into your kitchen.
          </p>
          <h2>Our Mission</h2>
          <p>SousAI aims to foster strong bonds and unforgettable moments through the joy of cooking.
            Whether you're a novice or a culinary enthusiast, SousAI is here to guide you in creating mouth-watering dishes that spark conversations and deepen relationships.
          </p>
          <h2>The Magic of SousAI</h2>
          <p>SousAI is your personal sous-chef powered by the latest AI technology. Our app generates unique and personalized recipes based on your preferences,
            dietary needs, and available ingredients.</p>

          <h2>Key Features:</h2>
          <ol>
            <li><strong>Personalized Recipe Generation:</strong> Get tailored recipes that suit your taste buds, dietary restrictions, and pantry items.</li>
            <li><strong>Interactive Cooking Assistant:</strong> Step-by-step guidance to ensure your cooking process is smooth and enjoyable.</li>
            <li><strong>Memory Journal:</strong> Capture and share your culinary adventures and the special moments created around the dining table.</li>
          </ol>
          <h3>Our Vision</h3>
          <p>We envision a world where meals are an opportunity to connect, learn, and create joy. SousAI aims to facilitate the warmth and love that comes from shared meals and conversations.</p>
          <h3>Contact Us</h3>
          <p className='about__p-feedback'>For support, feedback, or sharing your Sous stories, contact us at ngreensweig@gmail.com.</p>

        </div>
      </div>
    </div>
  );
}

export default AboutPage;
