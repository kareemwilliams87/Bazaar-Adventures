import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  // Fetch user profile if token is available
  useEffect(() => {
    if (authToken) {
      fetchUserProfile();
    }
  }, [authToken]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/profile', 
        // {
        // headers: {
        //   Authorization: `Bearer ${authToken}`,
        // }},
        {withCredentials: true}

      
      );
      console.log(res.data)
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      console.error("Error fetching user profile:", error);
      logout();
    }
  };

  // Registration function
  const register = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:8000/api/register', { email, password });
      const token = res.data.token;
      setAuthToken(token);
      localStorage.setItem('authToken', token);
      fetchUserProfile();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        console.error(`Registration failed: ${errorMessage}`);
        // Optionally display this error to the user via UI
      } else {
        console.error('An unexpected error occurred during registration:', error);
      }
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:8000/api/login', { email, password },{withCredentials: true});
      const token = res.data.token;
      setAuthToken(token);
      localStorage.setItem('authToken', token);
      fetchUserProfile();
      console.log(res.data)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Login failed: Invalid email or password');
        // Optionally display error to user
      } else {
        console.error('An unexpected error occurred during login:', error);
      }
    }
  };

  // Logout function
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
