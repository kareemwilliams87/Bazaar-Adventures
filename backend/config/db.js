import mongoose from 'mongoose';
import config from './config.js';

export const dbConnect = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error('Mongo URI is not defined');
    }
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};
