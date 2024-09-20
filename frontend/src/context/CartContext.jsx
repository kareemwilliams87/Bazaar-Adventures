import React, { createContext, useEffect, useState } from 'react';

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage or set it as an empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart if it's not already there
  const addItem = (item) => {
    // Check if the item already exists in the cart based on its id
    if (!cartItems.some(cartItem => cartItem._id === item._id)) {
      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Remove item from cart by ID
  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
