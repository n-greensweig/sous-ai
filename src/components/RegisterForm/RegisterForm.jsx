// Import React's useState hook for managing form inputs and Redux hooks for state and dispatch.
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Define the RegisterForm component.
function RegisterForm() {
  // Initialize state for username and password with empty strings.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Use the useSelector hook to access the Redux store's error state, specifically for registration errors.
  const errors = useSelector((store) => store.errors);
  // Initialize the useDispatch hook to enable dispatching actions to the Redux store.
  const dispatch = useDispatch();

  // Function to handle form submission.
  const registerUser = (event) => {
    event.preventDefault(); // Prevent default form submission behavior.

    // Dispatch an action to attempt user registration with the current state values for username and password.
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // End of registerUser function.

  // Render the registration form.
  return (
    // Form element with an onSubmit event handler calling the registerUser function.
    <form className="formPanel" onSubmit={registerUser}>
      <h2 style={{ color: '#333' }}>Register User</h2>
      {/* Conditionally render an error message if registration errors exist in the Redux store. */}
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      {/* Input field for username. */}
      <div>
        <label htmlFor="username" style={{ color: '#333' }}>
          Username:
          <input
            type="text"
            style={{ color: '#333' }}
            name="username"
            value={username}
            required // This field must be filled out to submit the form.
            onChange={(event) => setUsername(event.target.value)} // Update state when the input changes.
          />
        </label>
      </div>
      {/* Input field for password. */}
      <div>
        <label htmlFor="password" style={{ color: '#333' }}>
          Password:
          <input
            style={{ color: '#333' }}
            type="password"
            name="password"
            value={password}
            required // This field must be filled out to submit the form.
            onChange={(event) => setPassword(event.target.value)} // Update state when the input changes.
          />
        </label>
      </div>
      {/* Submit button for the form. */}
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

// Export the RegisterForm component for use in other parts of the application.
export default RegisterForm;