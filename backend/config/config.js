import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  openaiApiKey: process.env.REACT_APP_OPENAI_API_KEY,
};

export default config;

console.log('Config Mongo URI:', config.mongoUri); // Debug line
