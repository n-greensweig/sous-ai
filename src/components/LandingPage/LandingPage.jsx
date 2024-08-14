// Import stylesheet for LandingPage component
import './LandingPage.css';
// Import custom components for registration form and typewriter effect text
import TypewriterText from '../TypewriterText/TypewriterText';
import LoginPage from '../LoginPage/LoginPage';
function LandingPage() {
  // State hook for dynamic page heading
  // Determine the text for the first paragraph based on screen size
  const firstParagraphText = `Welcome to Sous! Let's cook.`;
  return (
    <div className='landing-page__container mobile-only-flex mobile-only-column mobile-only-align-center'>
      <h2 className='landing-page__heading'>Welcome</h2>
      <div className='grid landing-page__subheading mobile-only-flex mobile-only-column mobile-only-align-center'>
        <div className='grid-col grid-col_8'>
          {/* Dynamic TypewriterText component displaying responsive text */}
          <TypewriterText text={firstParagraphText} />
        </div>
        <div className='grid-col grid-col_4'>
          <LoginPage />
        </div>
      </div>
    </div>
  );
}
export default LandingPage;