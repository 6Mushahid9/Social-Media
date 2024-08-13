import mongoose from "mongoose";

const postShema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean
        // here we used Map instead of an array cuz this will take O(1) while array will take O(n)
    },
    comments:{
        type: Array,
        default:[]
    }
},{timestamps:true})

const Post = mongoose.model("Post", postShema)

export default Post