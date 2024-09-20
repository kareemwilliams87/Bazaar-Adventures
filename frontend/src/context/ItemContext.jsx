import { createContext, useState } from 'react';
import axios from 'axios';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/items');
      setItems(response.data);
      setError(null); // Reset error on success
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Error fetching items');
    }
  };

  const createItem = async (itemData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/items', itemData);
      setItems((prevItems) => [...prevItems, response.data]);
      setError(null); // Reset error on success
    } catch (error) {
      console.error('Error creating item:', error);
      setError('Error creating item');
    }
  };

  return (
    <ItemContext.Provider value={{ items, fetchItems, createItem, error }}>
      {children}
    </ItemContext.Provider>
  );
};
