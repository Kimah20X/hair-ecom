const express = require('express');
const { addProduct, getProducts, getProductById } = require('../controllers/productController.js');
const { protect, isAdmin } = require('../middleware/auth.js');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, isAdmin, addProduct);

module.exports = router;