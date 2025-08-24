const express = require('express');
const { identifier } = require('../middlewares/identification');
const { verifyVerificationCode } = require('../controllers/authController');
const router = express.Router();

router.get('/all-posts', postsController.getPosts);
router.get('/single-post', postController.singlePost);
router.post('/create-post', identifier, postController.createPost);

router.put('/update-post', identifier, postsController.createPost);

router.delete('/delete-post', identifier, postController.deletePost);