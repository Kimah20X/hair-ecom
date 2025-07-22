const mongoose = require('mongoose');
const Paystack = require('paystack');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Error:', error.message);
    process.exit(1);
  }
};

// Initialize Paystack client
const initializePaystack = () => {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error('PAYSTACK_SECRET_KEY is not defined in environment variables');
  }
  return Paystack(secretKey, {
    baseUrl: process.env.PAYSTACK_BASE_URL || 'https://api.paystack.co',
    timeout: 30000, // 30-second timeout for API requests
  });
};

module.exports = {
  connectDB, initializePaystack
};