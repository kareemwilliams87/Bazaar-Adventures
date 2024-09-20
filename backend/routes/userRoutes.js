import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController.js';

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Profile route
router.get('/profile', getProfile);

export default router;
