import Item from '../models/Item.js'; // Import the Item model

// Create a new item
export const createItem = async (req, res) => {
  try {
    console.log('Received item data:', req.body); // Log the incoming request body
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating item:', error); // Log the error
    res.status(400).json({ error: error.message });
  }
};

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('seller');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('seller');
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update item
export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete item
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get items based on chatbot queries
export const getItemsForChatbot = async (req, res) => {
  try {
    const { keyword } = req.query; // Use req.query to get the keyword
    console.log(keyword);

    if (!keyword || keyword.trim().length === 0) {
      return res.status(400).json({ error: 'Keyword parameter is required' });
    }

    // Convert the keyword to a number if possible
    const numberKeyword = parseInt(keyword, 10);

    // Search items using a case-insensitive match based on the keyword
    const items = await Item.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        ...(Number.isNaN(numberKeyword) ? [] : [{ price: numberKeyword }])
      ]
    }).limit(50);

    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found for the given keyword' });
    }

    res.json(items);
  } catch (error) {
    console.error('Error fetching items for chatbot:', error);
    res.status(500).json({ message: 'Error fetching items for chatbot', error: error.message });
  }
};
