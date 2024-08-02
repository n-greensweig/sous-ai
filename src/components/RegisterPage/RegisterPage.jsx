import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useHistory } from 'react-router-dom';
import './RegisterPage.css'; // Import the CSS file for custom styles

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="pageContainer">
      <RegisterForm />
      <div className="formFooter">
        <button
          type="button"
          className="linkButton"
          onClick={() => history.push('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;