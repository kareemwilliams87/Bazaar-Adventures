import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Marketplace from './components/Marketplace';
import ItemDetails from './components/ItemDetails';
import SellerItemsCRUD from './components/SellerItemsCRUD';
import RatingsCRUD from './components/RatingsCRUD';
import Chatbot from './components/Chatbot';
import LoginForm from './components/LoginForm';
import StoragePage from './components/StoragePage';
import Cart from './components/Cart'; // Import Cart
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import { ChatbotProvider } from './context/ChatbotContext';
import { ItemProvider } from './context/ItemContext';
import { CartProvider } from './context/CartContext';

function App() {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItemCount(cart.length);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ChatbotProvider>
          <ItemProvider>
            <CartProvider>
              <div className="container">
                <NavBar cartItemCount={cartItemCount} />
                <Routes>
                  <Route path="/" element={<Marketplace />} />
                  <Route path="/item/:id" element={<ItemDetails />} />
                  <Route path="/seller/:id" element={<StoragePage />} />
                  <Route path="/seller/items" element={<SellerItemsCRUD />} />
                  <Route path="/seller/ratings" element={<RatingsCRUD />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
                </Routes>
              </div>
            </CartProvider>
          </ItemProvider>
        </ChatbotProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
