const express = require('express');
const router = express.Router();
const authMiddleware =require('../middlewares/authMiddleware');
const upload =require('../middlewares/uploadMiddleware');
const {uploadFile,getFiles,deleteFiles} = require('../controllers/fileController');

router.post('/upload',authMiddleware, upload.single('file'),uploadFile);
router.get('/', authMiddleware,getFiles);
router.delete('/',authMiddleware,deleteFiles)
module.exports = router;