// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// // Needs to move to server
// import OpenAI from 'openai';

// // Needs to move to server
// const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true }); // need to move to server

// function UserPage() {

//   const dispatch = useDispatch();

//   // Get API response from responseReducer.js
//   const storedResponse = useSelector(store => store.response);

//   // Set response in state?
//   const [response, setResponse] = useState(storedResponse || '');

//   // Change to reducers
//   const [userInput, setUserInput] = useState('');

//   // Set user input from the form
//   const handleInputChange = e => {
//     setUserInput(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setResponse('');

//     // Dispatch an action to the store to make a request to OpenAI's server
//     // dispatch({ type: 'SET_OPENAI_API_RESPONSE', payload: response });

//     try {
//       const chatResponse = await openai.chat.completions.create({
//         model: 'gpt-4',
//         messages: [
//           {
//             'role': 'system',
//             'content': `You are a helpful assistant that generates recipes according to users requests.
//                 You kindly redirect all non-cooking related questions or comments back to the topic of cooking. Under no circumstances 
//                 are you allowed to use apostrophes. For example, you use phrases like "Here is your recipe." rather than "Here's your recipe."
                
//                 Also, you begin every set of recipe instructions with the following format, "Here is a delicious [recipe type] recipe. Ingredients:" and 
//                 then proceed to provide the ingredients and instructions of the recipe. For example, if the user says, "Write me a chicken pot pie recipe," or 
//                 "What's a good chicken pot pie recipe?", you respond with "Here is a delicious chicken pot pie recipe...Ingredients:" and then proceed to give the 
//                 rest of the recipe instructions. You always use this format and always use the words 'Here is a delicious' and 'recipe' in their respective places.
//                 `
//           },
//           {
//             'role': 'user',
//             'content': userInput,
//           }],
//         stream: true,
//       });
//       // const assistant = await openai.beta.assistants.create({
//       //   name: "Math Tutor",
//       //   instructions: "You are a personal math tutor. Write and run code to answer math questions.",
//       //   tools: [{ type: "code_interpreter" }],
//       //   model: "gpt-4-1106-preview"
//       // });
//       for await (const part of chatResponse) {
//         setResponse(prevResponse => part.choices[0].delta.content ? prevResponse + part.choices[0].delta.content : prevResponse);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setResponse('Error getting response');
//     }
//   };

//   // this component renders user reducer info to the DOM
//   const user = useSelector((store) => store.user);
//   return (
//     <div className="container">
//       {/* <h2>Welcome, {user.username}!</h2> */}
//       {response && <p>{response}</p>}
//       <form onSubmit={handleSubmit}>
//         <input type='text' value={userInput} onChange={handleInputChange} />
//         <button type='submit'>Send</button>
//       </form>
//       {/* <p>Your ID is: {user.id}</p>
//       <LogOutButton className="btn" /> */}
//     </div>
//   );
// }

// // this allows us to use <App /> in index.js
// export default UserPage;

import './UserPage.css';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

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
    }

    try {
      const response = await fetch('/completions', options); // change upon deployment?
      const data = await response.json();
      console.log(data)
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

  console.log(previousChats);
  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));
  console.log(uniqueTitles);


  return (
    <div className="App">
      <section className='side-bar'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <p>Made by Noah Greensweig</p>
        </nav>
      </section>
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

            <form onSubmit={getMessages}>
              <input value={value} onChange={e => setValue(e.target.value)}
                placeholder='What would you like to cook today?' />
              <button id="submit">➢</button>
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
