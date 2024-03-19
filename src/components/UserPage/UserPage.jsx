import './UserPage.css';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { Button, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { PacmanLoader } from 'react-spinners';

import swal from 'sweetalert';

function UserPage() {

  const dispatch = useDispatch(); // dispatch
  const [value, setValue] = useState('');
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

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
      setCreatedRecipes(prevRecipes => [...prevRecipes, data.choices[0].message]);
      console.log('hello', createdRecipes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    const action = { type: 'SAVE_RECIPE', payload: recipe };
    dispatch(action);
    // setNewRecipe({});
    swal({
      title: 'Saved!',
      text: '1 recipe saved',
      icon: 'success',
      timer: 1000,
      buttons: false
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

  // Check the screen size for responsive design
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          {currentChat?.map((chatMessage, index) => <li className='response' key={index}>
            <p className="role">{capitalizeFirstLetter(chatMessage.role) === 'Assistant' ?
              <div id='name-pic' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img className='avi' src={`images/sous.png`}
                  height={'30'}
                  width={'30'}
                  style={{ borderRadius: '75%', marginRight: '15px' }}
                />
                <strong>SousAI</strong>
              </div>
              :
              <div id='name-pic' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img className='avi' src={`images/user-avatar.png`}
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
                  : isJSON(chatMessage.content) && JSON.parse(chatMessage.content).prep_time
                    ? (
                      <div className='black'>
                        <strong>Recipe Name: </strong>
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

              {/* Ingredients list */}
              {
                chatMessage.role === 'user'
                  ? null
                  : isJSON(chatMessage.content) && JSON.parse(chatMessage.content).ingredients
                    ? (
                      <div style={{ margin: '15px 0' }}>
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

        <div className='bottom-section' style={{ marginBottom: '7%', margin: '0 10px 7% 10px' }}>
          <div className="input-container">

            <form onSubmit={getMessages} id='sous-form' style={{ marginBottom: '0px' }}>

              <textarea value={loading ? '' : value} disabled={loading ? true : false} onChange={e => setValue(e.target.value)}
                placeholder='What would you like to cook today?' required
                style={{ height: 'auto', minHeight: '30px', }}
              />

              {value.trim() && !loading ?
                <Button style={{ backgroundColor: '#333333' }} type='submit' id='submit'><ArrowUpwardIcon className='up-icon'
                  style={{ fill: '#FFF', justifyContent: 'center' }} /></Button> :
                <Button disabled type='submit' id='submit'>
                  <ArrowUpwardIcon className='up-icon'
                    style={{ justifyContent: 'center' }} />
                </Button>
              }
            </form>
          </div>
          <p className="info" style={{ marginBottom: isSmScreen || isXsScreen ? '10%' : null }}>
            As of {month} {year}, SousAI operates on a message-by-message basis.<br></br>
            Each interaction is independent, and the app does not have the ability to reference prior messages in the conversation.
          </p>

        </div>
      </section >
    </div >
  );
}

export default UserPage;