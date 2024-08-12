/* in this file we are going to register a new user
1. extract add data from req.body
2. create a UserModel Object
3. upload this new object

*/

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// Register User
export const register = async(req,res)=>{
    try {
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        const salt= await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        /*
         Salt Generation: The bcrypt.genSalt() function generates a random salt to ensure that even identical passwords will have different hashes.
         Hashing: The bcrypt.hash() function combines the salt and the user's password to produce a secure hash.
         */
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            veiwedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })
        const savedUser = await newUser.save()
        res.
        status(201).
        json(savedUser)
    
    
    } catch (error) {
        res.status(500).json({err: error.message})
    }
}


// Logging in
export const login = async(req,res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email:email})
        if(!user)   res.status(400).json({msg: "User not found"})
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)    res.status(400).json({msg: "Invalid credentials"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({token, user})
    } catch (error) {
        res.status(500).json({err: error.message})
    }
}