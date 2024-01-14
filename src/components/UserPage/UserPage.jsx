import './UserPage.css';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { Button, FormControl } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { PacmanLoader } from 'react-spinners';

import swal from 'sweetalert';

function UserPage() {

  const [value, setValue] = useState('');
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [newRecipe, setNewRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseComplete, setResponseComplete] = useState(true);

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

  const getMessages = async (e) => {

    e.preventDefault();

    setLoading(true);
    setResponseComplete(false);

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
    } finally {
      setLoading(false);
      setResponseComplete(true);
    }

  };

  // Helper function to capitalize first letter of a string
  const capitalizeFirstLetter = str => str.replace(str.charAt(0), str.charAt(0).toUpperCase());


  // Save recipe onClick of 'Save recipe' button
  const saveRecipe = e => {

    e.preventDefault();

    const recipe = {
      message: message.content,
    };

    // setNewRecipe(recipe);

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
      ));
      setValue('');
    }

  }, [message, currentTitle]);

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));

  const isJSON = str => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const replaceWithCommas = str => str.replace(/@/g, ',');


  return (
    <div className="App">
      {/* <section className='side-bar'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
      </section> */}
      <section className='main' style={{ color: '#374151' }}>
        <h1>SousAI</h1>
        <ul className='feed'>
          {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className="role">{capitalizeFirstLetter(chatMessage.role) === 'Assistant' ?
              <div id='name-pic' style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={`images/sous.png`}
                  height={'30'}
                  width={'30'}
                  style={{ borderRadius: '75%', marginRight: '15px' }}
                />
                <strong>SousAI</strong>
              </div>
              :
              <div id='name-pic' style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={`images/user-avatar-two.png`}
                  height={'30'}
                  width={'30'}
                  style={{ borderRadius: '75%', marginRight: '15px' }}
                />
                <strong>You</strong>
              </div>
            }</p>

            <p>

              {/* Title, time, and notes */}
              {
                chatMessage.role === 'user'
                  ? chatMessage.content
                  : isJSON(chatMessage.content) && replaceWithCommas(JSON.parse(chatMessage.content).prep_time)
                    ? (
                      <div className='black'>
                        <strong>Title: </strong>
                        {replaceWithCommas(JSON.parse(chatMessage.content).recipe_name)}<br></br><br></br>
                        <strong>Prep Time: </strong>
                        {replaceWithCommas(JSON.parse(chatMessage.content).prep_time)}<br></br><br></br>
                        <strong>Cook Time: </strong>
                        {replaceWithCommas(JSON.parse(chatMessage.content).cook_time)}<br></br><br></br>
                        <strong>Number of servings: </strong>
                        {replaceWithCommas(JSON.parse(chatMessage.content).number_of_servings)}<br></br><br></br>
                        <strong>Recipe notes: </strong>
                        {replaceWithCommas(JSON.parse(chatMessage.content).notes)}
                      </div>
                    )
                    : chatMessage.content
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
                            <li key={index}>{replaceWithCommas(ingredient)}</li>
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
                            <li key={index} color='black'>{replaceWithCommas(instruction)}</li>
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

        {loading && <div id='pacman'>
          Cooking up delicious recipe...<PacmanLoader color='#DAA520' size={20} />
        </div>
        }

        <div className='bottom-section' style={{ marginBottom: '7%' }}>
          <div className="input-container">

            <form onSubmit={getMessages} id='sous-form'>
              <input value={loading ? '' : value} onChange={e => setValue(e.target.value)}
                placeholder='What would you like to cook today?' required />
              {value.trim() !== '' ?
                <Button style={{ backgroundColor: '#444654' }} startIcon={<ArrowUpwardIcon className='up-icon'
                  style={{ fill: '#F5F5F5' }} />} type='submit' id='submit'></Button> :
                <Button disabled startIcon={<ArrowUpwardIcon className='up-icon' />} type='submit' id='submit'></Button>
              }
            </form>
          </div>
          <p className="info">
            SousAI can make mistakes. Consider checking important information.
          </p>

        </div>
      </section >
    </div >
  );
}

export default UserPage;
