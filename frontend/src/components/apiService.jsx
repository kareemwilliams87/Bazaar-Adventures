import axios from 'axios';

const backendApi = axios.create({
  baseURL: 'http://localhost:8000/api', // Ensure this URL is correct
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch items based on a keyword
export const fetchItems = async (keyword) => {
  try {
    const response = await backendApi.get('/chatbot/items', {
      params: { keyword }, // Pass keyword as a query parameter
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; // Re-throw the error for further handling
  }
};
