const express = require('express');
const router = express.Router();
const authMiddleware =require('../middlewares/authMiddleware');
const upload =require('../middlewares/uploadMiddleware');
const {uploadFile,getFiles,deleteFiles,viewFiles} = require('../controllers/fileController');

router.post('/upload',authMiddleware, upload.single('file'),uploadFile);
router.get('/', authMiddleware,getFiles);
router.delete('/:id/delete',authMiddleware,deleteFiles);
router.get('/:id/view',authMiddleware,viewFiles)
module.exports = router;