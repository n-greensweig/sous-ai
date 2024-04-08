// Import styles specific to the UserPage component
import './SousAI.css';
// React hooks for managing state and lifecycle in functional components
import { useState, useEffect, useRef } from "react";
// Hook from redux for dispatching actions
import { useDispatch } from 'react-redux';
// MUI components for UI design
import { Button, useTheme, useMediaQuery } from '@mui/material';
// MUI icons for button decorations
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Unused import, consider removing
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
// Specialized button that includes an icon, part of MUI
import IconButton from '@mui/material/IconButton';
// Transition effect for Snackbar component
import Fade from '@mui/material/Fade';
// Component for temporary messages
import Snackbar from '@mui/material/Snackbar';
// Component for displaying alert messages
import Alert from '@mui/material/Alert';
// Loader component for indicating loading state
import { PacmanLoader } from 'react-spinners';
import Header from '../Header/Header';

function SousAI() {
  // Redux hook for dispatching actions
  const dispatch = useDispatch();
  // State hooks for various component states
  const [value, setValue] = useState(''); // Stores current input value
  const [previousChats, setPreviousChats] = useState([]); // Stores chat history
  const [currentTitle, setCurrentTitle] = useState(null); // Stores title of current chat
  const [message, setMessage] = useState(null); // Stores the current message
  const [createdRecipes, setCreatedRecipes] = useState([]); // Stores recipes created in the session
  const [loading, setLoading] = useState(false); // Indicates whether a request is in progress
  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto'; // Reset the height so the scrollHeight measurement is correct
    const maxHeight = 200; // Maximum height before scrolling
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    textarea.scrollTop = textarea.scrollHeight; // Scroll to the bottom
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'; // Allow scrolling if the content exceeds maxHeight
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]); // Call adjustTextareaHeight whenever 'value' changes


  // Date utilities for displaying current month and year
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  // Function to reset chat creation form
  const createNewChat = () => {
    setMessage(null);
    setValue('');
    setCurrentTitle(null);
  };

  // State for managing Snackbar component
  const [state, setState] = useState({
    open: false, // Controls Snackbar visibility
    vertical: 'top', // Vertical positioning of Snackbar
    horizontal: 'center', // Horizontal positioning of Snackbar
    autoHideDuration: 1000, // Duration before Snackbar auto hides
  });
  const { vertical, horizontal, open } = state;

  // Function to close Snackbar
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // Async function to fetch messages from server
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
      const response = await fetch('/completions', options); // Fetch API call
      const data = await response.json(); // Parsing response data
      setMessage(data.choices[0].message); // Setting message from response
      setCreatedRecipes(prevRecipes => [...prevRecipes, data.choices[0].message]); // Adding new recipe to list
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to capitalize first letter of a string
  const capitalizeFirstLetter = str => str.replace(str.charAt(0), str.charAt(0).toUpperCase());

  // Function to dispatch save recipe action
  const saveRecipe = e => {
    e.preventDefault();
    const recipe = {
      message: message.content,
    };
    const action = { type: 'SAVE_RECIPE', payload: recipe };
    dispatch(action);
    setState({ ...state, open: true, vertical: 'top', horizontal: 'center' });
  };

  // Effect hook to update chat history based on currentTitle and message
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

  // MUI hooks for responsive design checks
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('xs')); // Checks for extra-small screens
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm')); // Checks for small screens

  // Filters chat history for messages belonging to the current chat session
  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle);
  // Extracts unique titles from chat history for navigation purposes
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));

  // Utility function to check if a string is valid JSON
  const isJSON = str => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Utility function to replace all instances of '@' with commas in a string
  const replaceWithCommas = str => str.replace(/@/g, ',');

  return (
    <div className="App">
      {/* Snackbar component displays temporary messages or alerts */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={1500} // Duration before Snackbar hides, increased for better user experience
        TransitionComponent={Fade} // Fade transition for Snackbar appearance
        key={vertical + horizontal}
      >
        <Alert
          icon={<CheckCircleOutlineIcon style={{ fill: 'white' }} />} // Custom icon color
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon style={{ fill: 'white' }} />
            </IconButton>
          }
          onClose={handleClose}
          severity="success" // Indicates the nature of the alert
          variant="filled"
        >
          {/* Message displayed in the alert */}
          Recipe saved!
        </Alert>
      </Snackbar>

      {/* Main content area */}
      <section className='main' style={{ color: '#374151', }}>
        {/* Page title */}
        <Header />
        <div className='section__chat'>
          <h1>SousAI</h1>
          <ul className='feed'>
            {/* Maps over currentChat to render chat messages */}
            {currentChat?.map((chatMessage, index) => (
              <li className='response' key={index}>
                <p className="role">
                  {/* Conditional rendering based on the role of the message sender */}
                  {capitalizeFirstLetter(chatMessage.role) === 'Assistant' ?
                    // Renders assistant's avatar and name
                    <div id='name-pic' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img className='avi' src={`images/avatars/sous.png`}
                        height={'30'}
                        width={'30'}
                        style={{ borderRadius: '75%', marginRight: '15px' }}
                      />
                      <strong>SousAI</strong>
                    </div>
                    :
                    // Renders user's avatar and name
                    <div id='name-pic' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img className='avi' src={`images/avatars/user-avatar.png`}
                        height={'30'}
                        width={'30'}
                        style={{ borderRadius: '75%', marginRight: '15px' }}
                      />
                      <strong>You</strong>
                    </div>
                  }
                </p>

                <p>
                  {/* Conditional rendering for recipe content, including parsing JSON if needed */}
                  {chatMessage.role === 'user'
                    ? chatMessage.content // User's message
                    : isJSON(chatMessage.content) && JSON.parse(chatMessage.content).prep_time
                      ? (
                        // Recipe details formatted
                        <div className='black'>
                          <strong>Recipe Name: </strong>
                          {replaceWithCommas(JSON.parse(chatMessage.content).recipe_name)}<br /><br />
                          <strong>Prep Time: </strong>
                          {replaceWithCommas(JSON.parse(chatMessage.content).prep_time)}<br /><br />
                          <strong>Cook Time: </strong>
                          {replaceWithCommas(JSON.parse(chatMessage.content).cook_time)}<br /><br />
                          <strong>Number of servings: </strong>
                          {replaceWithCommas(JSON.parse(chatMessage.content).number_of_servings)}<br /><br />
                          <strong>Recipe notes: </strong>
                          {replaceWithCommas(JSON.parse(chatMessage.content).notes)}
                        </div>
                      )
                      : chatMessage.content // Fallback to plain message content
                  }

                  {/* Conditional rendering for ingredients list */}
                  {chatMessage.role === 'user'
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
                  {/* Conditional rendering for cooking instructions */}
                  {
                    chatMessage.role === 'user'
                      ? null
                      : isJSON(chatMessage.content) && JSON.parse(chatMessage.content).instructions
                        ? (
                          <div>
                            <strong>Instructions:</strong>
                            <ol>
                              {JSON.parse(chatMessage.content).instructions.map((instruction, index) => (
                                <li key={index}>{replaceWithCommas(instruction)}</li>
                              ))}
                            </ol>
                          </div>
                        )
                        : null
                  }
                </p>
                {/* Button to save the recipe if it's from the assistant and is in JSON format */}
                {chatMessage.role === 'assistant' && isJSON(chatMessage.content) ? <button onClick={saveRecipe} id='save-recipe-button'>Save recipe</button> : null}
              </li>
            ))}
          </ul>

          {/* Loader animation to indicate that a recipe is being prepared */}
          {loading && (
            <div id='pacman'>
              Cooking up delicious recipe...<PacmanLoader color='#DAA520' size={20} />
            </div>
          )}

          {/* Input form for new recipe requests */}
          <div className='bottom-section' style={{ marginBottom: isXsScreen || isSmScreen ? '5%' : null }}>
            <div className="input-container">
              <form onSubmit={getMessages} id='sous-form'>
                <textarea
                  id="dynamic-textarea"
                  ref={textareaRef}
                  value={loading ? '' : value}
                  disabled={loading}
                  onChange={e => {
                    setValue(e.target.value);
                    adjustTextareaHeight(); // Adjust the height after setting the new value
                  }}
                  style={{ padding: '0px 0px 0px 10px', }}
                  onKeyDown={(e) => {
                    // Check if Enter key is pressed without the Shift key
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault(); // Prevent the default action to avoid a new line
                      getMessages(e); // Call the function directly or use the form's submit method
                    }
                  }}
                  placeholder='What would you like to cook today?'
                  required
                />
                {/* Submit button changes based on whether input value is present and not loading */}
                {value.trim() && !loading
                  ? <Button style={{ backgroundColor: '#333333' }}
                    sx={{ minWidth: '33px', }}
                    type='submit' id='submit'>
                    <ArrowUpwardIcon className='up-icon' style={{ fill: '#FFF', justifyContent: 'center' }} />
                  </Button>
                  : <Button sx={{ minWidth: '33px', }} disabled type='submit' id='submit'>
                    <ArrowUpwardIcon className='up-icon' style={{ justifyContent: 'center' }} />
                  </Button>
                }
              </form>
            </div>
            {/* Informational text about how the app operates */}
            <p className="info" style={{ marginBottom: isSmScreen || isXsScreen ? '10%' : null }}>
              As of {month} {year}, SousAI operates on a message-by-message basis.<br />
              Each interaction is independent, and the app does not have the ability to reference prior messages in the conversation.
            </p>
          </div>
        </div>
      </section>
    </div >
  );
}

export default SousAI;