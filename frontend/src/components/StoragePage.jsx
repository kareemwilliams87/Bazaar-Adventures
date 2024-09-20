import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StorePage = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState({});
  const [items, setItems] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        // Fetch seller data
        const { data: sellerData } = await axios.get(`/api/sellers/${id}`);
        setSeller(sellerData);

        // Fetch items data
        const { data: itemsData } = await axios.get(`/api/items?seller=${id}`);
        console.log('Items data:', itemsData); // Check if this is an array
        setItems(Array.isArray(itemsData) ? itemsData : []);

        // Fetch ratings data
        const { data: ratingsData } = await axios.get(`/api/ratings?seller=${id}`);
        console.log('Ratings data:', ratingsData); // Check the structure of this data
        setRatings(Array.isArray(ratingsData) ? ratingsData : []);
      } catch (error) {
        console.error('Error fetching store data:', error);
      }
    };

    fetchStoreData();
  }, [id]);

  return (
    <div>
      <h1>{seller.storeName}</h1>
      <div className="store-items">
        {Array.isArray(items) && items.length > 0 ? (
          items.map(item => (
            <div key={item._id} className="store-item">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>{item.price}</p>
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
      <div className="store-ratings">
        <h3>Ratings</h3>
        {Array.isArray(ratings) && ratings.length > 0 ? (
          ratings.map(rating => (
            <p key={rating._id}>{rating.comment}</p>
          ))
        ) : (
          <p>No ratings available</p>
        )}
      </div>
    </div>
  );
};

export default StorePage;
