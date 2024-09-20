import mongoose from 'mongoose';

// Define the item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
}, { timestamps: true });

// Create a text index on 'name' and 'description'
itemSchema.index({ name: 'text', description: 'text' });

// Create the Item model
const Item = mongoose.model('Item', itemSchema);

// Export the model
export default Item;
