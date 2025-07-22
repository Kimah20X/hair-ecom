const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCartItem, clearCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/auth.js');

router.post('/', protect, addToCart);
router.get('/user/:userId', protect, getCart); // Note: Use userId from token, not param
router.patch('/item', protect, updateCartItem);
router.delete('/clear', protect, clearCart); // Clear cart for the user
router.delete('/item/:productId', removeFromCart);

module.exports = router;