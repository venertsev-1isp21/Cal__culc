import { useState } from 'react';
import axios from 'axios';

const API = 'http://127.0.0.1:8000/api';

export const useFoodSearch = (token) => {
  const [searchResults, setSearchResults] = useState([]);

  const searchFood = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const res = await axios.get(`${API}/foods/?q=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setSearchResults(res.data);
  };

  return {
    searchResults,
    searchFood,
    setSearchResults,
  };
};
