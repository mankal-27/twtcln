import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { 
        getALlPost , 
        getAllLikedPost , 
        createPost, 
        deletePost, 
        commentOnPost, 
        likeUnlikePost,
        getFollowingPosts ,
        getUserPosts
    } from '../controllers/post.controller.js';
const router = express.Router();


router.get("/all", protectRoute, getALlPost);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getAllLikedPost);
router.get("/user/:username", protectRoute, getUserPosts)
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;