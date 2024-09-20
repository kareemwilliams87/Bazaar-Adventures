// SearchComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/search', { params: { query } });
      setResults(response.data);
    } catch (error) {
      setError('Error fetching items from backend');
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {results.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
