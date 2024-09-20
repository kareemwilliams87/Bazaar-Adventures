import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../context/ItemContext';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const { items, fetchItems, error } = useContext(ItemContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    fetchItems(); // Fetch all items on component mount
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="marketplace">
      <h1>Bazaar Finds</h1>
      {error && <p className="error">{error}</p>} {/* Display error if it exists */}
      
      <div className="item-grid">
        {Array.isArray(currentItems) && currentItems.length > 0 ? (
          currentItems.map(item => (
            <Link to={`/item/${item._id}`} key={item._id} className="item-card">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>{item.price}</p>
            </Link>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Option to change items per page */}
      <div className="items-per-page">
        <label htmlFor="itemsPerPage">Items per page:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page when items per page changes
          }}
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="18">18</option>
        </select>
      </div>
    </div>
  );
};

export default Marketplace;
