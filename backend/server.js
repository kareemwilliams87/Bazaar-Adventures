import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbConnect } from './config/db.js'; // Database connection setup
import config from './config/config.js'; // Config setup (e.g., port, OpenAI key)

// Load routes
import itemRoutes from './routes/itemRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import userRoutes from './routes/userRoutes.js'; // This handles register, login, and profile
import authRoutes from './routes/auth.js'; // Authentication routes

// Create the OpenAI API instance
import axios from 'axios';
const openaiApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${config.openaiApiKey}`,
    'Content-Type': 'application/json',
  },
});

// Express app setup
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allow requests from frontend
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies

// API routes
app.use('/api', itemRoutes);      // For item-related routes
app.use('/api', sellerRoutes);  // For seller-related routes
app.use('/api', ratingRoutes);  // For rating-related routes
app.use('/api', userRoutes);      // For user-related routes (register, login, profile)
app.use('/api', authRoutes);       // For authentication routes

// OpenAI API route
app.post('/api/openai', async (req, res) => {
  try {
    const response = await openaiApi.post('/completions', {
      model: 'text-davinci-003',
      prompt: req.body.prompt,
      max_tokens: 150,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error);
    res.status(500).json({ error: 'Failed to fetch data from OpenAI' });
  }
});

// Start the server
const startServer = async () => {
  try {
    await dbConnect(); // Connect to MongoDB
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
