import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (isRegistering) {
        await register(email, password);
        navigate('/profile'); // Redirect to profile after registration
      } else {
        await login(email, password);
        navigate('/'); // Redirect to dashboard after login
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
        Switch to {isRegistering ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default LoginForm;
