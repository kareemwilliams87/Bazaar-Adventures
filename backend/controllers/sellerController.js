import Seller from '../models/Seller.js'; // Import the default export

// Get all sellers
export const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a seller by ID
export const getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (seller) {
      res.json(seller);
    } else {
      res.status(404).json({ message: 'Seller not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new seller
export const createSeller = async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).json(seller);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a seller
export const updateSeller = async (req, res) => {
  try {
    const updatedSeller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSeller);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a seller
export const deleteSeller = async (req, res) => {
  try {
    await Seller.findByIdAndDelete(req.params.id);
    res.json({ message: 'Seller deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
