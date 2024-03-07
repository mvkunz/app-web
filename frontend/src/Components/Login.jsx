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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValidEmail && isValidPassword) {
      const response = await fetch('https://backend-products-b0316b247c2e.herokuapp.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        alert('Invalid email or password');
      }
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token)
        navigate('/products');
      }
    } else {
      alert('Invalid email or password');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-3xl font-bold text-white">Login</h3>
      <div className="flex justify-center items-center h-40 mb-2">
        <label
          htmlFor="email"
          className="block mb-2 text-xl font-medium text-gray-900 text-white dark:text-black"
        >
          E-mail
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
            placeholder="name@company.com"
            required=""
            value={email}
            onChange={handleEmailChange}
          />
        </label>
      </div>
      <div className="flex justify-center items-center h-3 pt-0">
        <label
          htmlFor='password'
          className="block mb-2 text-xl font-medium text-white dark:text-black"
        >
          Password
          {' '}
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
            placeholder="•••••••••"
            required=""
          />
        </label>
      </div>
      <button
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-52 h-288 my-10"
        type="submit"
        disabled={!(isValidEmail && isValidPassword)}
      >
        ENTER
      </button>
    </form>
  );
}

export default Login;