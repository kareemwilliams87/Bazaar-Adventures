import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const User = mongoose.model('User', userSchema);

export default User;


