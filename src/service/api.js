import { useState } from 'react';
import { baseURL } from '../constant';


const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = async (endpoint) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}${endpoint}`);

      if (response.status === 404) {
        throw await response.json();
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err);
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const post = async (endpoint, data) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      return responseData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { loading, error, get, post, clearError };
};

export default useApi;
