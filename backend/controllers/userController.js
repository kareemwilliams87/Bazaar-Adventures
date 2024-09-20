import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
const secret = process.env.JWT_SECRET || process.env.SECRET_KEY;

// User registration
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });

    // Set token in cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    res.status(201).json({ message: 'Registration successful', user: { id: newUser._id, email: newUser.email } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log('logging controller%%%%%%%%%')
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
    console.log(token)
    // Set token in cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    res.json({ message: 'Login successful', user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error });
  }
};

// Logout Controller
export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logged out successfully" });
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    // Extract user ID from JWT token (assuming JWT middleware for authentication)
    const userId = jwt.decode(req.cookies.token, {complete: true});

    // Find user by ID
    
    const user = await User.findById(userId.payload.id).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};
