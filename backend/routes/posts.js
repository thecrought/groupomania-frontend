const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts');

router.get('/', auth, postsCtrl.getAllStuff);
router.post('/', auth, multer, postsCtrl.createPost);  
router.get('/:id', auth, postsCtrl.getOnePost);
router.put('/:id', auth, multer, postsCtrl.modifyPost);
router.post('/:id/like', auth, multer, postsCtrl.postRaiting);
router.post('/:id/dislike', auth, multer, postsCtrl.postDislike);
router.post('/:id/read', auth, multer, postsCtrl.postRead);
router.delete('/:id', auth, postsCtrl.deletePost);

module.exports = router;