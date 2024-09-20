import express from 'express';
import * as ratingController from '../controllers/ratingsController.js'; // Update the import statement here
const router = express.Router();

router.post('/ratings', ratingController.createRating);
router.get('/ratings/:sellerId', ratingController.getRatingsForSeller);
router.put('/ratings/:id', ratingController.updateRating);
router.delete('/ratings/:id', ratingController.deleteRating);

export default router;
