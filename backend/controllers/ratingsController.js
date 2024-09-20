import Rating from '../models/Rating.js'; // Import the default export

// Create a new rating
export const createRating = async (req, res) => {
  try {
    const rating = new Rating(req.body);
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get ratings for a seller
export const getRatingsForSeller = async (req, res) => {
  try {
    const ratings = await Rating.find({ seller: req.params.sellerId }).populate('user');
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a rating
export const updateRating = async (req, res) => {
  try {
    const updatedRating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a rating
export const deleteRating = async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rating deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
