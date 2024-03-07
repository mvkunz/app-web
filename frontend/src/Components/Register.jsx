import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-products-b0316b247c2e.herokuapp.com/api/auth/register', {
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
        throw new Error('Erro ao registrar. Por favor, tente novamente.');
      }

      if (response.ok) {
        alert('Registrado com sucesso!')
        navigate('/auth/login')
      }
    } catch (err) {
      // tratamento de erro
      setError(err.message);
      console.error('Erro ao registrar:', err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white dark:text-black">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center h-40 mb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-xl font-medium text-gray-900 text-white dark:text-black"
          >Email:
            <input
              type="email"
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
          >Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
              placeholder="•••••••••"
              required=""
            />
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-52 h-288 my-10"
        >
          REGISTER
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterForm;
