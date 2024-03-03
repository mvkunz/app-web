import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.length >= 6;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidEmail && isValidPassword) {
      navigate('/products');
    } else {
      alert('Invalid email or password');
    }
  }

  return (
    <form onSubmit={ handleSubmit }>
      <h3>Login:</h3>
      <label htmlFor="email">
        E-mail
        {' '}
        <input
          type="email"
          id="email"
          value={ email }
          onChange={ handleEmailChange }
        />
      </label>
      {' '}
      <label htmlFor='password'>
        Password
        {' '}
        <input
          type="password"
          id="password"
          value={ password }
          onChange={ handlePasswordChange }
        />
      </label>
      <button
        type="submit"
        disabled={ !(isValidEmail && isValidPassword) }
      >
        ENTER
      </button>
    </form>
  );
}

export default Login;