import { useState } from 'react';

const API_BASE_URL = 'https://shelf-83w3.onrender.com'; // Replace with your backend API endpoint

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = async (endpoint) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);

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
      const response = await fetch(`${API_BASE_URL}`, {
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
