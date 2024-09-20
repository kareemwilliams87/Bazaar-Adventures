import express from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemsForChatbot,
} from '../controllers/itemController.js';

const router = express.Router();

// Define routes for items
router.post('/items', createItem);
router.get('/items', getItems);
router.get('/items/:id', getItemById);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

router.get('/chatbot/items', getItemsForChatbot);


export default router;
