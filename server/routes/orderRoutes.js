const express = require('express');
const { createOrder, getOrderById, getOrders } = require('../controllers/orderController.js');

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/:id', getOrderById);

module.exports = router;