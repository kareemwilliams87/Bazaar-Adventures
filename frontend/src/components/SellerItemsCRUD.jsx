import React, { useContext, useState } from 'react';
import { ItemContext } from '../context/ItemContext';

const SellerItemsCRUD = () => {
  const { createItem, error } = useContext(ItemContext);
  const [itemData, setItemData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemData.name || !itemData.price || !itemData.image) {
      console.error('Please fill out all fields');
      return;
    }
    createItem(itemData);
    setItemData({ name: '', price: '', description: '', image: '' }); // Reset form after submission
  };

  return (
    <div className="seller-crud">
      <h1>Manage Your Items</h1>
      {error && <p className="error">{error}</p>} {/* Display error if exists */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemData.name}
          onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={itemData.price}
          onChange={(e) => setItemData({ ...itemData, price: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Image "
          value={itemData.image}
          onChange={(e) => setItemData({ ...itemData, image: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={itemData.description}
          onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default SellerItemsCRUD;
