import './UserPage.css';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function UserPage() {

  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [newRecipe, setNewRecipe] = useState({});

  const dispatch = useDispatch(); // dispatch

  const createNewChat = () => {
    setMessage(null);
    setValue('');
    setCurrentTitle(null);
  };

  const handleClick = uniqueTitle => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue('');
  };

  const getMessages = async () => {

    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value
      }),
      headers: {
        'Content-type': 'application/json'
      }
    };

    try {
      const response = await fetch('/completions', options); // change upon deployment?
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }

  };

  // Helper function to capitalize first letter of a string
  const capitalizeFirstLetter = str => str.replace(str.charAt(0), str.charAt(0).toUpperCase());


  // Save recipe onClick of 'Save recipe' button
  const saveRecipe = e => {

    e.preventDefault();

    const recipe = {
      title: capitalizeFirstLetter(message.content.slice(message.content.indexOf('delicious') + 10, message.content.indexOf('recipe') - 1)),
      instructions: message.content.split('Ingredients:')[1],
    };

    setNewRecipe(recipe);

    const action = { type: 'SAVE_RECIPE', payload: recipe };
    dispatch(action);

    setNewRecipe({});

  };


  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }

    if (currentTitle && value && message) {
      setPreviousChats(previousChats => (
        [...previousChats,
        {
          title: currentTitle,
          role: 'user',
          content: value
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content
        }
        ]
      ))
    }

  }, [message, currentTitle]);

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));


  return (
    <div className="App">
      {/* <section className='side-bar'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
      </section> */}
      <section className='main'>
        {!currentTitle && <h1>SousAI</h1>}
        <ul className='feed'>
          {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className="role">{capitalizeFirstLetter(chatMessage.role)}</p>
            <p>{chatMessage.content}</p>
            {chatMessage.role === 'assistant' ? <button onClick={saveRecipe}>Save recipe</button> : null}
          </li>
          )}
        </ul>
        <div className='bottom-section'>
          <div className="input-container">

            <form onSubmit={getMessages} id='sous-form'>
              <input value={value} onChange={e => setValue(e.target.value)}
                placeholder='What would you like to cook today?' />
              <Button startIcon={<ArrowUpwardIcon />} id='submit'></Button>
              {/* <button id="submit">➢</button> */}
            </form>

          </div>
          <p className="info">
            SousAI can make mistakes. Consider checking important information.
          </p>

        </div>
      </section>
    </div>
  );
}

export default UserPage;
