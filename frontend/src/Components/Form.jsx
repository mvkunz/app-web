import { useState } from 'react';

function Form() {
  const INITIAL_STATE = {
    login: '',
    password: ''
  };

  const [formInfo, setFormInfo] = useState(INITIAL_STATE);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInfo(prevFormInfo => {
      const updatedFormInfo = {
        ...prevFormInfo,
        [name]: value
      };

      const charactersPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).*$/;
      const { login, password } = updatedFormInfo;

      if (
        login.length > 0
        && password.length >= 8 && password.length <= 16
        && charactersPassword.test(password)
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }

      return updatedFormInfo;
    });
  };

  const { login, password } = formInfo;

  return (
    <form>
      <label htmlFor="login">Login</label>
      <input
        type="text"
        id="login"
        name="login"
        value={login}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
      />

      <button
        disabled={buttonDisabled}
        type="submit"
        >
          Entrar
      </button>
    </form>
  );
}

export default Form;