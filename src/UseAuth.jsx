import { useState, useEffect } from 'react';
import axios from 'axios';

const UseAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:80/api/v1/auth/protected', {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Agregamos la función de actualización del estado
  const updateAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  return { isAuthenticated, loading, updateAuthStatus };
};

export default UseAuth;