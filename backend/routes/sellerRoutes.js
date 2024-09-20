import express from 'express';
import { 
  getSellers, 
  getSellerById, 
  createSeller, 
  updateSeller, 
  deleteSeller 
} from '../controllers/sellerController.js'; // Import named exports

const router = express.Router();

// Define routes
router.get('/sellers', getSellers);
router.get('/sellers/:id', getSellerById);
router.post('/sellers', createSeller);
router.put('/sellers/:id', updateSeller);
router.delete('/sellers/:id', deleteSeller);

export default router; // Export the router as default
