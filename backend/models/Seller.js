import mongoose from 'mongoose';

const { Schema } = mongoose;

const sellerSchema = new Schema({
  name: { type: String, required: true },
  storeName: { type: String },
  storeDescription: { type: String },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }], // Refers to the Item model
  fiveStarRatings: { type: Number, default: 0 }, // Field to track 5-star ratings
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
