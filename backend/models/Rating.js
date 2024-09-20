import mongoose from 'mongoose';

// Rating Schema
const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be an integer between 1 and 5',
    },
  },
  review: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Middleware to track 5-star ratings for sellers
ratingSchema.post('save', async function (doc) {
  if (doc.rating === 5) {
    const Seller = mongoose.model('Seller'); // Assuming you have a Seller model
    await Seller.findByIdAndUpdate(doc.seller, { $inc: { fiveStarRatings: 1 } });
  }
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
