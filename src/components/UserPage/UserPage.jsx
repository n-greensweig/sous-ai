import './UserPage.css';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import swal from 'sweetalert';
import { RampRight } from '@mui/icons-material';

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

    console.log(JSON.parse(message.content).recipe_name);

    const recipe = {
      message: message.content,
    };

    setNewRecipe(recipe);

    const action = { type: 'SAVE_RECIPE', payload: recipe };
    dispatch(action);

    setNewRecipe({});

    swal({
      title: 'Saved!',
      text: '1 recipe saved',
      icon: 'success',
      timer: 2000,
    });

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

  const isJSON = str => {
    try {
      JSON.parse(str);
      console.log('hey', JSON.parse(str).ingredients);
      return true;
    } catch (error) {
      return false;
    }
  };


  return (
    <div className="App">
      {/* <section className='side-bar'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
      </section> */}
      <section className='main'>
        <h1>SousAI</h1>
        {/* {!currentTitle && <h1>SousAI</h1>} */}
        <ul className='feed'>
          {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className="role">{capitalizeFirstLetter(chatMessage.role) === 'Assistant' ?
              <div id='name-pic' style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={`images/sous.png`}
                  height={'30'}
                  width={'30'}
                  style={{ borderRadius: '75%', marginRight: '15px' }}
                />
                <span>SousAI</span>
              </div>
              : capitalizeFirstLetter(chatMessage.role)
            }</p>
            {/* <p>{chatMessage.content}</p> */}
            <p>
              {
                chatMessage.role === 'user' ? chatMessage.content :
                  isJSON(chatMessage.content) ? 'Title: ' + JSON.parse(chatMessage.content).recipe_name : chatMessage.content
              }

              <br></br>
              <br></br>

              {/* Time and notes */}
              {
                chatMessage.role === 'user'
                  ? null
                  : isJSON(chatMessage.content) && JSON.parse(chatMessage.content).prep_time
                    ? (
                      <div>
                        <strong>Prep Time: </strong>
                        {JSON.parse(chatMessage.content).prep_time}<br></br><br></br>
                        <strong>Cook Time: </strong>
                        {JSON.parse(chatMessage.content).cook_time}<br></br><br></br>
                        <strong>Number of servings: </strong>
                        {JSON.parse(chatMessage.content).number_of_servings}<br></br><br></br>
                        <strong>Recipe notes: </strong>
                        {JSON.parse(chatMessage.content).notes}
                      </div>
                    )
                    : null
              }

              <br></br>
              <br></br>

              {/* Ingredients list */}
              {
                chatMessage.role === 'user'
                  ? null
                  : isJSON(chatMessage.content) && JSON.parse(chatMessage.content).ingredients
                    ? (
                      <div>
                        <strong>Ingredients:</strong>
                        <ul>
                          {JSON.parse(chatMessage.content).ingredients.map((ingredient, index) => (
                            <li key={index} color='black'>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    )
                    : null
              }

              <br></br>
              <br></br>

              {/* Instructions */}
              {
                chatMessage.role === 'user'
                  ? null
                  : isJSON(chatMessage.content) && JSON.parse(chatMessage.content).instructions
                    ? (
                      <div>
                        <strong>Instructions:</strong>
                        <ol>
                          {JSON.parse(chatMessage.content).instructions.map((instruction, index) => (
                            <li key={index} color='black'>{instruction}</li>
                          ))}
                        </ol>
                      </div>
                    )
                    : null
              }
            </p>
            {chatMessage.role === 'assistant' && isJSON(chatMessage.content) ? <button onClick={saveRecipe} id='save-recipe-button'>Save recipe</button> : null}
          </li>
          )}
        </ul>

        <div className='bottom-section'>
          <div className="input-container">

            <form onSubmit={getMessages} id='sous-form'>
              <input value={value} onChange={e => setValue(e.target.value)}
                placeholder='What would you like to cook today?' />
              <Button startIcon={<ArrowUpwardIcon />} type='submit' id='submit'></Button>
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
