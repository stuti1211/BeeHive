const express = require('express');
const { signup,login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { getProfile } = require('../controllers/profileController');


const router = express.Router();

router.post('/signup', signup);
router.post ('/login',login);
router.get('/me', authMiddleware, getProfile);

module.exports = router;

