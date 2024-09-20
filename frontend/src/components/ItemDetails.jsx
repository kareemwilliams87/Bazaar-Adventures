import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader'; // Import the Loader component

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const { data: itemData } = await axios.get(`http://localhost:8000/api/items/${id}`);
        setItem(itemData);

        if (itemData?.seller) {
          const { data: sellerData } = await axios.get(`http://localhost:8000/api/sellers/${itemData.seller}`);
          setSeller(sellerData);
        }
      } catch (err) {
        setError('Failed to load item details.');
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`${item.name} added to cart!`);
  };

  if (loading) {
    return <Loader />; // Show the loader while loading
  }

  if (error) {
    return <p>{error}</p>; // Show error message if any
  }

  return (
    <div className="item-large-view">
      {item && (
        <>
          {/* Enlarged Image */}
          <img src={item.image} alt={item.name} />
          
          {/* Item Name */}
          <h1>{item.name}</h1>

          {/* Item Price */}
          <p>Price: {item.price}</p>

          {/* Item Description */}
          <p>{item.description}</p>

          {/* Add to Cart Button */}
          <button onClick={() => addToCart(item)}>Add to Cart</button>

          {/* Seller Details */}
          {seller && (
            <>
              <p>Seller: <Link to={`/seller/${seller._id}`}>{seller.storeName}</Link></p>
              <p>Average Rating: {seller.averageRating || 'No ratings yet'}</p>
              <Link to={`/seller/${seller._id}`}>Visit Seller Store</Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ItemDetails;
