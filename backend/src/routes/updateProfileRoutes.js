const express = require('express');
const router = express.Router();
const pool = require('../db/postgres');
const authMiddleware =require('../middlewares/authMiddleware');
const {updateProfile} =require('../controllers/profileController')

router.post('/',authMiddleware,updateProfile);


module.exports = router;