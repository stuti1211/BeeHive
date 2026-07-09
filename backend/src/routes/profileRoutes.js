const express = require('express');
const router = express.Router();
const pool = require('../db/postgres');
const authMiddleware =require('../middlewares/authMiddleware')
const {getProfile}= require('../controllers/profileController')

router.get('/',authMiddleware,getProfile);

module.exports = router;