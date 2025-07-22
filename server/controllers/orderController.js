const Order = require('../models/Order.js');
const axios = require('axios');

// create an order(POST)
const createOrder = async (req, res) => {
  try {
    const { products, totalprice } = req.body;
    const userId = req.user.id;
    const order = new Order({ user: userId, products, totalprice, paymentReference: null });
    const savedOrder = await order.save();
    res.status(201).json({ order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('products.product', 'name price');

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { reference } = req.body;
    const order = await Order.findOne({ paymentReference: reference });
    if (order) {
      order.paymentStatus = 'paid';
      await order.save();
      res.status(200).json({ message: 'Payment confirmed', order });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment confirmation failed' });
  }
};

// get order by id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user products.product');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.verifyPayment = async (req, res) => {
  const { reference } = req.body;
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer YOUR_PAYSTACK_SECRET_KEY`, // Replace with your secret key
        },
      }
    );

    if (response.data.data.status === "success") {
      // Update order status in your DB here
      return res.json({ success: true, message: "Payment verified!" });
    } else {
      return res.status(400).json({ success: false, message: "Payment not successful" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Verification failed", error: error.message });
  }
};

module.exports = { createOrder, getOrderById, getOrders, confirmPayment };