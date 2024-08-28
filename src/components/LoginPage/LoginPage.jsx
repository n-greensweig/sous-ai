import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file for custom styles

function LoginPage() {
  const history = useHistory();

  return (
    <div className="pageContainer">
      <LoginForm />
      <div className="formFooter">
        <button
          type="button"
          className="linkButton"
          onClick={() => history.push('/registration')}>
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginPage;