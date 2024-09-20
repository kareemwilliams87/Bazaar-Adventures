import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Import CartContext

const Cart = () => {
  const { cartItems, removeItem } = useContext(CartContext); // Get cart items and remove function

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item, idx) => (
            <div key={idx} className="cart-item">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <button onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
