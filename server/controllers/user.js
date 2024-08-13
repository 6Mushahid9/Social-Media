import  pkg  from "mongoose";
import User from "../models/userModel.js";

const {Promise} = pkg
export const getUser = async(req,res)=>{
    try {
        const id = req.params
        const user = await User.findById(id)
        if(!user)  
            res.status(404).json("User not found")
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUserFriends = async(req,res)=>{
    try {
        const id = req.params
        const user = await User.findById(id)
        
        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        )
        const formattedList = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath})=>{
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
        )
        res.status(200).json({formattedList})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const addRemoveFriends = async(req,res)=>{
    try {
        const {id , friendId} = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        // if friend is already present then remove else add him/her
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=> id !== friendId)
            // the below code will see that if i am removing a friend then that friend will automatically remove me also
            friend.friends = friend.friends.filter((id)=> id !== id)
        } else {
            user.friends.push(friendId)
            // the below code will see that if i am adding a friend then that user will also add me 
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()

        // now since our friend list was updated we agan want to format it 
        const friends= await Promise.all(
            user.friends.map((id)=> User.findById(id))
        )
        const formattedList = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath})=>{
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
        )

        res.status(200).json(formattedList)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}