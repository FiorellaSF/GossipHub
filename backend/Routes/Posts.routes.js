import express from "express"
import { createPost, deletePost, getAllPosts, getSinglePost, getUserPosts, imageUpdate, updatePost } from "../Controllers/Posts.controller.js"
import verifyToken from '../Middlewares/Auth.middleware.js'

const router = express.Router()

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);

router.get('/username', verifyToken, getUserPosts);

router.post('/post', createPost);

router.put('/update/:id', verifyToken, updatePost);
router.put('/image/update/:id', verifyToken, imageUpdate);

router.delete('/delete/:id', verifyToken, deletePost);

export default router