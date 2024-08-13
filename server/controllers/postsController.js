import Post from "../models/postModel.js"
import User from "../models/userModel.js"

// CREATE
export const createPost = async(req,res)=>{
    try {
        // when someone will add post, there will be a picture, a userId and picture description
        const {userId, description, picturePath} = req.body

        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save()

        // after saveing a post we need to return all posts of DB to frontend
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

// READ
export const getFeedPosts = async(req,res)=>{
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUserPosts = async(req,res)=>{
    try {
        const {userId}= req.params()
        const posts = await Post.find({userId})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({msg: error.message})   
    }
}

// UPDATE
export const likePost= async(req,res)=>{
    try {
        // we need the user pressing the like button & the post on which he is liking
        const {postId} = req.params
        const {userId} = req.body
        const post = await Post.findById(postId)
        const isliked = post.likes.get(userId)

        if(isliked)
            post.likes.delete(userId)
        else
            post.likes.set(userId, true)

        const updatedPost = await Post.findByIdAndUpdate(
            postId, 
            {likes: post.likes}, 
            {new: true}
        )

        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}







