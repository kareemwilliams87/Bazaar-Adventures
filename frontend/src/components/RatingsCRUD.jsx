import React, { useContext, useState } from 'react';
import { ItemContext } from '../context/ItemContext';

const RatingsCRUD = ({ sellerId }) => {
  const { createRating, updateRating, deleteRating } = useContext(ItemContext);
  const [ratingData, setRatingData] = useState({ rating: 0, comment: '' });

  const handleSubmit = e => {
    e.preventDefault();
    createRating(sellerId, ratingData);
  };

  return (
    <div className="ratings-crud">
      <h1>Rate Seller</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          max="5"
          value={ratingData.rating}
          onChange={e => setRatingData({ ...ratingData, rating: e.target.value })}
        />
        <textarea
          placeholder="Comment"
          value={ratingData.comment}
          onChange={e => setRatingData({ ...ratingData, comment: e.target.value })}
        />
        <button type="submit">Submit Rating</button>
      </form>
    </div>
  );
};

export default RatingsCRUD;
