import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// CRUD for Items
export const createItem = (itemData) => api.post('/items', itemData);
export const getItems = () => api.get('/items');
export const updateItem = (id, itemData) => api.put(`/items/${id}`, itemData);
export const deleteItem = (id) => api.delete(`/items/${id}`);

// CRUD for Sellers
export const createSeller = (sellerData) => api.post('/sellers', sellerData);
export const getSellers = () => api.get('/sellers');
export const updateSeller = (id, sellerData) => api.put(`/sellers/${id}`, sellerData);
export const deleteSeller = (id) => api.delete(`/sellers/${id}`);

// CRUD for Ratings
export const createRating = (ratingData) => api.post('/ratings', ratingData);
export const getRatingsForSeller = (sellerId) => api.get(`/ratings/${sellerId}`);
export const updateRating = (id, ratingData) => api.put(`/ratings/${id}`, ratingData);
export const deleteRating = (id) => api.delete(`/ratings/${id}`);

// Default export for `api`
export default api;
