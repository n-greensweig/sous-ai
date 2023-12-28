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
//       // const chatResponse = await openai.chat.completions.create({
//       //   model: 'gpt-4',
//       //   messages: [
//       //     {
//       //       'role': 'system',
//       //       'content': `You are a helpful assistant that provides recipes according to users' requests. 
//       //       You politely direct all non-recipe related requests back to the topic of recipes. Under no circumstances 
//       //       are you permitted to use an apostrophe in your response; instead, you should always change contractions to their fullest form 
//       //       (e.g., writing out here is rather than saying here's). Additionally, your responses are formatted in a way such that they render 
//       //       ordered or unordered lists when used in a React component. Users should see bullet points for the 
//       //       ingredients and numbered lists for the recipe instructions.`,
//       //     },
//       //     {
//       //       'role': 'user',
//       //       'content': userInput,
//       //     }],
//       //   stream: true,
//       // });
//       const assistant = await openai.beta.assistants.create({
//         name: "Math Tutor",
//         instructions: "You are a personal math tutor. Write and run code to answer math questions.",
//         tools: [{ type: "code_interpreter" }],
//         model: "gpt-4-1106-preview"
//       });
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

function UserPage() {

  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

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
      const response = await fetch('http://localhost:5000/completions', options);
      const data = await response.json();
      console.log(data)
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }

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
          <p>Made by Noah</p>
        </nav>
      </section>
      <section className='main'>
        {!currentTitle && <h1>SousAI</h1>}
        <ul className='feed'>
          {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className="role">{chatMessage.role.toUpperCase()}</p>
            <p>{chatMessage.content}</p>
            {chatMessage.role === 'assistant' ? <button>Save recipe</button> : null}
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
