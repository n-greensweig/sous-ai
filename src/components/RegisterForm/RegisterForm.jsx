import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css'; // Import the CSS file for custom styles

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: 'REGISTER',
      payload: { username, password },
    });
  };

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2 className="formTitle">Register User</h2>
      {errors.registrationMessage && (
        <div className="alert" role="alert">
          {errors.registrationMessage}
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
      <button type="submit" className="formButton">Register</button>
    </form>
  );
}

export default RegisterForm;
