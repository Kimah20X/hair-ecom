const express = require('express');
const { registerUser, loginUser, getUser, getUsers } = require('../controllers/userController.js');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;