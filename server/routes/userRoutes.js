const express = require('express');
const { registerUser, loginUser, getUser, getUsers, createAdmin, updateUserRole } = require('../controllers/userController.js');
const { protect, isAdmin, isUserOrAdmin } = require('../middleware/auth.js');
const router = express.Router();

// router.get('/', protect, isAdmin, getUsers);
// router.get('/:id', protect, isUserOrAdmin, getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin', protect, isAdmin, createAdmin);
router.patch('/role/:id', protect, isAdmin, updateUserRole);


module.exports = router;