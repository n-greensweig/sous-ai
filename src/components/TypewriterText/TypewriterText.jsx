import React, { useState, useEffect } from 'react';

function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 5); // Adjust the interval for typing speed

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, currentIndex]);

  return <p style={{color: '#f6f1eb'}}>{displayText}</p>;
}

export default TypewriterText;