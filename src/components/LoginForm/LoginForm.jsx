import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css'; // Import the CSS file for custom styles

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: { username, password },
      });
      let viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.content = "initial-scale=1";
      }
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <form className="formPanel" onSubmit={login}>
      <h2 className="formTitle">Login</h2>
      {errors.loginMessage && (
        <div className="alert" role="alert">
          {errors.loginMessage}
        </div>
      )}
      <div className="formGroup">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          className="formInput"
        />
      </div>
      <div className="formGroup">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete='on'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="formInput"
        />
      </div>
      <button type="submit" className="formButton">Log In</button>
    </form>
  );
}

export default LoginForm;
