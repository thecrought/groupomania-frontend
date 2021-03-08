const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comments');

router.get('/', commentCtrl.getComments);
router.post('/', commentCtrl.createComment);


module.exports = router;