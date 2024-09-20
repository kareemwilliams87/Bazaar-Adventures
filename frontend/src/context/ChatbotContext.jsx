import React, { createContext, useState } from 'react';
import axios from 'axios';
import { fetchItems } from '../components/apiService'; // Mock API service

// Access the OpenAI API key from the environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openaiApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});
export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
  ]);
  
  const sendMessage = async (text) => {
    console.log(OPENAI_API_KEY);
    const newMessage = { sender: 'user', text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (!text.trim()) {
      const errorResponse = { sender: 'bot', text: 'Please enter a valid search term.' };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
      return;
    }

    // if (text.toLowerCase().includes('search') || text.toLowerCase().includes('item')) {
      try {
        const items = await fetchItems(text); // Fetch items based on the input
        if (items.length > 0) {
          const itemResponses = items.map((item) => ({
            sender: 'bot',
            text: `I found an item: ${item.name}`,
            itemId: item._id, // Include the item ID here to link
          }));
          setMessages((prevMessages) => [...prevMessages, ...itemResponses]);
        } else {
          const botResponse = { sender: 'bot', text: 'No items found.' };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }
      } catch (error) {
        console.error('Error fetching items from backend:', error);
        const errorResponse = { sender: 'bot', text: 'Sorry, I am having trouble finding items.' };
        setMessages((prevMessages) => [...prevMessages, errorResponse]);
      }
    // } else {
    //   // Handle other types of responses (non-search)
    //   const response = await getResponseFromAI(text);
    //   const botResponse = { sender: 'bot', text: response };
    //   setMessages((prevMessages) => [...prevMessages, botResponse]);
    // }
  };

  const getResponseFromAI = async (userMessage) => {
    try {
      const response = await openaiApi.post('/completions', {
        model: 'text-davinci-003',
        prompt: userMessage,
        max_tokens: 50,
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Sorry, I am unable to assist you at the moment.';
    }
  };

  return (
    <ChatbotContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatbotContext.Provider>
  );
};
