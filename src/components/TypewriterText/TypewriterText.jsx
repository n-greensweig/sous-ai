import React, { useState, useEffect } from 'react';
// A component that simulates a typewriter effect for the given text prop.
function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState(''); // Holds the part of the text displayed so far.
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current position in the input text.
  useEffect(() => {
    // Creates an interval that updates displayText by adding one character from text at each step.
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(typingInterval); // Stops the interval when all characters are displayed.
      }
    }, 5); // The interval duration controls the speed of the typewriting effect.

    return () => clearInterval(typingInterval); // Cleanup to clear the interval on component unmount.
  }, [text, currentIndex]); // Effect dependencies to restart the animation if the text changes.
  return <p className='landing-page__typewriter-text'>{displayText}</p>;
}
export default TypewriterText;