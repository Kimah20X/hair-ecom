const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, Paystack } = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const fetch = require('node-fetch');
//const { protect, isAdmin } = require('./middleware/auth.js');
const axios = require('axios');

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Vite default port

// Connect to MongoDB
connectDB();


// app.get('/', (req, res) => {
//   res.send('HairLux API is running');
// });

// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Currency Conversion (USD to NGN)
let usdToNgnRate = 1;
const updateExchangeRate = async () => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    usdToNgnRate = data.rates.NGN || 1;
    console.log('USD to NGN rate updated:', usdToNgnRate);
  } catch (error) {
    console.error('Failed to update USD to NGN rate:', error);
  }
};
updateExchangeRate();
setInterval(updateExchangeRate, 60 * 60 * 1000);

app.get('/api/currency-rate', (req, res) => {
  if (usdToNgnRate === 1 && process.env.NODE_ENV !== 'development') {
    return res.status(503).json({ message: 'Exchange rate not available yet' });
  }
  res.status(200).json({ rate: usdToNgnRate });
});

// Paystack Payment Route
app.post('/api/initialize-payment', async (req, res) => {
  const { email, amount } = req.body; // Amount in kobo (NGN subunit)
  try {
    const response = await Paystack.transaction.initialize({
      email,
      amount: amount * 100, // Convert to kobo (1 NGN = 100 kobo)
      currency: 'NGN',
      reference: `ref_${Math.random().toString(36).substr(2, 9)}`, // Unique reference
      callback_url: 'http://localhost:5173/checkout/callback', // Update for production
    });
    res.status(200).json({ authorization_url: response.data.authorization_url, reference: response.data.reference });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment initialization failed' });
  }
});

app.post('/api/verify-payment', async (req, res) => {
  const { reference } = req.body;
  try {
    const response = await Paystack.transaction.verify({ reference });
    if (response.data.status === 'success') {
      res.status(200).json({ message: 'Payment verified', data: response.data });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment verification failed' });
  }
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));   