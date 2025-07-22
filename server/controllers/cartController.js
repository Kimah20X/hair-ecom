const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create or Update Cart (Add Item)
const addToCart = async (req, res) => {
  try {
    const { userId } = req.user; // From decoded JWT
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], total: 0 });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.total = cart.items.reduce((sum, item) => sum + (product.price * item.quantity), 0);
    cart.updatedAt = Date.now();
    const updatedCart = await cart.save();

    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Cart by User
const getCart = async (req, res) => {
  try {
    const { userId } = req.user; // From decoded JWT
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Cart Item Quantity
const updateCartItem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid product ID and quantity (minimum 1) are required' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    const product = await Product.findById(productId);
    cart.total = cart.items.reduce((sum, item) => sum + (product.price * item.quantity), 0);
    cart.updatedAt = Date.now();
    const updatedCart = await cart.save();

    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Clear Cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { items: [], total: 0, updatedAt: Date.now() },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    cart.total = cart.items.reduce((sum, item) => sum + (item.quantity * (Product.findById(item.product)).price), 0);
    const updatedCart = await cart.save();
    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addToCart, getCart, updateCartItem, clearCart, removeFromCart };