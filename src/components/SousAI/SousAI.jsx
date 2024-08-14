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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// Specialized button that includes an icon, part of MUI
import IconButton from '@mui/material/IconButton';
// Transition effect for Snackbar component
import Fade from '@mui/material/Fade';
// Component for temporary messages
import Snackbar from '@mui/material/Snackbar';
// Component for displaying alert messages
import Alert from '@mui/material/Alert';
// Loader component for indicating loading state
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
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
  const [recipeSaved, setRecipeSaved] = useState({}); // Indicates whether a recipe has been saved
  const userPreferences = useSelector(store => store.userPreferencesReducer);
  const userHouseholdItems = useSelector(store => store.userHouseholdItemsReducer);
  const userIngredients = useSelector(store => store.userIngredientsReducer);
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

  useEffect(() => {
    document.body.style.zoom = '100%';
  }, []);

  // Date utilities for displaying current month and year
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  // Function to reset chat creation form
  // const createNewChat = () => {
  //   setMessage(null);
  //   setValue('');
  //   setCurrentTitle(null);
  // };

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
        message: value,
        preferences: userPreferences,
        householdItems: userHouseholdItems,
        ingredients: userIngredients,
        previousChats: previousChats,
      }),
      headers: {
        'Content-type': 'application/json'
      }
    };
    try {
      const response = await fetch('/completions', options); // Fetch API call
      const data = await response.json(); // Parsing response data
      console.log(previousChats);
      setMessage(data.choices[0].message); // Setting message from response
      // setPreviousChats(prev => [...prev, {
      //   role: 'assistant',
      //   content: message,
      //   title: value // Assuming title is set from the input for contextual understanding
      // }]);
      setCreatedRecipes(prevRecipes => [...prevRecipes, data.choices[0].message]); // Adding new recipe to list
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  document.title = 'Sous'; // Set the title of the page

  // Helper function to capitalize first letter of a string
  const capitalizeFirstLetter = str => str.replace(str.charAt(0), str.charAt(0).toUpperCase());

  // Function to dispatch save recipe action
  const saveRecipe = (index) => {
    const recipe = previousChats[index].content;
    const action = { type: 'SAVE_RECIPE', payload: { message: recipe } };
    dispatch(action);
    setState({ ...state, open: true, vertical: 'top', horizontal: 'center' });
    setRecipeSaved(prev => ({ ...prev, [index]: true }));
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
    dispatch({ type: 'FETCH_USER_PREFERENCES' });
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

  // Utility function to format time strings in minutes to hours and minutes
  const formatTime = timeString => {
    // Convert string to an integer
    const timeInMinutes = parseInt(timeString, 10);

    // Check if time is 60 minutes or more
    if (timeInMinutes >= 60) {
      const hours = Math.floor(timeInMinutes / 60);
      const minutes = timeInMinutes % 60;

      // Return a formatted string in terms of hours and remaining minutes
      if (minutes === 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
      } else {
        return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 || minutes === 0 ? 's' : ''}`;
      }
    } else {
      // Return in minutes if less than 60
      return `${timeInMinutes} minute${timeInMinutes > 1 || timeInMinutes === 0 ? 's' : ''}`;
    }
  };

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
        <div className='section__chat' style={{ paddingTop: isXsScreen || isSmScreen ? '60px' : null, }}>
          {isXsScreen || isSmScreen ? null : <h1>Sous</h1>}
          <ul className='feed'>
            {/* Maps over currentChat to render chat messages */}
            {currentChat?.map((chatMessage, index) => (
              <li className='response' key={index}>
                <p className="role">
                  {/* Conditional rendering based on the role of the message sender */}
                  {capitalizeFirstLetter(chatMessage.role) === 'Assistant' ?
                    // Renders assistant's avatar and name
                    <div id='name-pic' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img className='avi' src={`images/avatars/sous.svg`}
                        height={'30'}
                        width={'30'}
                        style={{ borderRadius: '75%', marginRight: '15px' }}
                      />
                      <strong>Sous</strong>
                    </div>
                    :
                    // Renders user's avatar and name
                    <div id='name-pic' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img className='avi' src={`images/avatars/user-avatar.svg`}
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
                    : !JSON.parse(chatMessage.content).non_cooking_response && JSON.parse(chatMessage.content).prep_time
                      ? (
                        // Recipe details formatted
                        <div className='black'>
                          <strong>Recipe Name: </strong>
                          {replaceWithCommas(JSON.parse(chatMessage.content).recipe_name)}<br /><br />
                          <strong>Prep Time: </strong>
                          {formatTime(replaceWithCommas(JSON.parse(chatMessage.content).prep_time.split(' ')[0]))}<br /><br />
                          <strong>Cook Time: </strong>
                          {formatTime(replaceWithCommas(JSON.parse(chatMessage.content).cook_time.split(' ')[0]))}<br /><br />
                          <strong>Number of servings: </strong>
                          {replaceWithCommas(JSON.parse(chatMessage.content).number_of_servings)}<br /><br />
                          <strong>Recipe notes: </strong>
                          {replaceWithCommas(JSON.parse(chatMessage.content).notes)}
                        </div>
                      )
                      : replaceWithCommas(JSON.parse(chatMessage.content).non_cooking_response) // Fallback to plain message content
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
                {chatMessage.role === 'assistant' && !JSON.parse(chatMessage.content).non_cooking_response ? (
                  <Button
                    variant="contained"
                    startIcon={recipeSaved[index] ? <CheckCircleIcon sx={{ fill: 'white' }} /> : <BookmarkIcon sx={{ fill: 'white' }} />}
                    color={recipeSaved[index] ? "success" : "primary"}
                    disabled={!!recipeSaved[index]}
                    onClick={() => saveRecipe(index)}
                    sx={{
                      marginTop: '10px',
                      textTransform: 'none',
                      backgroundColor: recipeSaved[index] ? '#66BB6A' : '#81C784',
                      '&:hover': {
                        backgroundColor: recipeSaved[index] ? '#4CAF50' : '#66BB6A',
                      },
                      '&:disabled': {
                        backgroundColor: '#A5D6A7',
                      }
                    }}
                  >
                    {recipeSaved[index] ? 'Recipe Saved' : 'Save Recipe'}
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>


          {/* Input form for new recipe requests */}
          <div className='bottom-section' style={{
            marginBottom: isXsScreen || isSmScreen ? '3%' : null,
            display: isXsScreen || isSmScreen ? 'fixed' : null,
          }}>
          {/* Loader animation to indicate that a recipe is being prepared */}
          {loading && <div id='skeleton'>
            <SkeletonTheme baseColor='#e0e0e0' highlightColor='#f0f0f0'>
              <Skeleton count={3} />
            </SkeletonTheme>
          </div>}
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
                  style={{ padding: '0px 41px 0px 10px', }}
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
                  ? <Button style={{ backgroundColor: '#333333', }}
                    sx={{ minWidth: '33px', }}
                    type='submit' id='submit'>
                    <ArrowUpwardIcon className='up-icon' sx={{ fill: '#FFF', justifyContent: 'center', }} />
                  </Button>
                  : <Button sx={{ minWidth: '33px', }} disabled type='submit' id='submit'>
                    <ArrowUpwardIcon className='up-icon' sx={{ justifyContent: 'center' }} />
                  </Button>
                }
              </form>
            </div>
            {/* Informational text about how the app operates */}
            {/* <p className="info">
              As of {month} {year}, Sous operates on a message-by-message basis.<br />
              Each interaction is independent, and the app does not have the ability to reference prior messages in the conversation.
            </p> */}
          </div>
        </div>
      </section >
    </div >
  );
}

export default SousAI;