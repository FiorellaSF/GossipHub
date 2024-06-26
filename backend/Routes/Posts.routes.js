import express from "express"
import { createPost, deletePost, getAllPosts, getSinglePost, getUserPosts, imageUpdate, updatePost } from "../Controllers/Posts.controller.js"
// import { limiter } from "../Middlewares/rateLimit.middleware.js"
import verifyToken from '../Middlewares/Auth.middleware.js'

const router = express.Router()

// router.use(limiter);

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);

router.get('/user/:postedBy', getUserPosts);

router.post('/', createPost);

router.put('/update/:id', verifyToken, updatePost);
router.put('/image/update/:id', verifyToken, imageUpdate);

router.delete('/delete/:id', verifyToken, deletePost);

export default router