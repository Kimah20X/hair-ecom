const Order = require('../models/Order.js');

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
// create an order(POST)
const createOrder = async (req, res) => {
  try {
    const { user, products, totalPrice, shippingAddress, paymentMethod } = req.body;
    const order = await Order.create({ user, products, totalPrice, shippingAddress, paymentMethod });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
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

module.exports = { createOrder, getOrderById, getOrders };