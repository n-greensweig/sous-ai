import './UserPage.css';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import swal from 'sweetalert';

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

  const string = `
  { "recipe_name": "Chicken Chili", "prep_time": "20 minutes", "cook_time": "45 minutes", "number_of_servings": "6", "ingredients": { "Chicken breasts": "2", "Olive oil": "2 tablespoons", "Onion": "1, chopped", "Garlic": "2 cloves, minced", "Red bell pepper": "1, chopped", "Green bell pepper": "1, chopped", "Chili powder": "2 tablespoons", "Cumin": "1 teaspoon", "Oregano": "1 teaspoon", "Canned diced tomatoes": "1 can (14 ounces)", "Canned kidney beans": "1 can (14 ounces), drained and rinsed", "Chicken broth": "2 cups", "Salt": "1 teaspoon", "Black pepper": "1/2 teaspoon", "Cheddar cheese": "1 cup, shredded", "Sour cream": "for topping", "Fresh cilantro": "for topping" }, "instructions": { "step1": "Heat the oil in a large pot over medium heat.", "step2": "Add the chicken breasts and cook until no longer pink in the center, about 5-7 minutes. Remove from the pot and shred.", "step3": "In the same pot, add the onion, garlic, and bell peppers, and cook until softened.", "step4": "Add the chili powder, cumin, and oregano to the pot. Stir to combine.", "step5": "Return the shredded chicken to the pot. Add the diced tomatoes, kidney beans, chicken broth, salt, and pepper. Stir to combine.", "step6": "Bring the mixture to a boil. Reduce heat to low and simmer for 30 minutes, stirring occasionally.", "step7": "Serve the chili hot, topped with shredded cheese, a dollop of sour cream, and a sprinkling of fresh cilantro." }, "notes": "Feel free to adjust the spices to your liking. For a spicy version, add a chopped jalapeno pepper or some hot sauce. You can also use ground chicken instead of chicken breasts." }`;
  const object = JSON.parse(string);
  console.log(object);


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
              'SousAI' : capitalizeFirstLetter(chatMessage.role)
            }</p>
            <p>{chatMessage.content}</p>
            {/* <p>
              {
                chatMessage.role === 'user' ? chatMessage.content :
                  JSON.parse(chatMessage.content).recipe_name ? JSON.parse(chatMessage.content).recipe_name : chatMessage.content
              }
            </p> */}
            {chatMessage.role === 'assistant' ? <button onClick={saveRecipe} id='save-recipe-button'>Save recipe</button> : null}
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
