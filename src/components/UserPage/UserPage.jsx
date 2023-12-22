import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Needs to move to server
import OpenAI from 'openai';

// Needs to move to server
const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true }); // need to move to server

function UserPage() {

  const dispatch = useDispatch();

  // Get API response from responseReducer.js
  const storedResponse = useSelector(store => store.response);

  // Set response in state?
  const [response, setResponse] = useState(storedResponse || '');

  // Change to reducers
  const [userInput, setUserInput] = useState('');

  // Set user input from the form
  const handleInputChange = e => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('');

    // Dispatch an action to the store to make a request to OpenAI's server
    // dispatch({ type: 'SET_OPENAI_API_RESPONSE', payload: response });

    try {
      const chatResponse = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            'role': 'system',
            'content': `You are a helpful assistant that provides recipes according to users' requests. 
            You politely direct all non-recipe related requests back to the topic of recipes. Under no circumstances 
            may you use an apostrophe in your response. Additionally, your responses are formatted in a way such that they render 
            ordered or unordered lists when used in a React component. Users should see bullet points for the 
            ingredients and numbered lists for the recipe instructions.`,
          },
          {
            'role': 'user',
            'content': userInput,
          }],
        stream: true,
      });
      for await (const part of chatResponse) {
        setResponse(prevResponse => part.choices[0].delta.content ? prevResponse + part.choices[0].delta.content : prevResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error getting response');
    }
  };

  // this component renders user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      {/* <h2>Welcome, {user.username}!</h2> */}
      {response && <p>{response}</p>}
      <form onSubmit={handleSubmit}>
        <input type='text' value={userInput} onChange={handleInputChange} />
        <button type='submit'>Send</button>
      </form>
      {/* <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
