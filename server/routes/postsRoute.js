import express from "express"
import {getFeedPosts, getUserPosts, likePost} from "../controllers/postsController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const router= express.Router()

// READ
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts)

// UPDATe
router.patch("/:id/like", verifyToken, likePost)

export default router