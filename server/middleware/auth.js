import jwt from "jsonwebtoken"

export const verifyToken = async(req, res, next)=>{
    try {
        console.log(req.headers)
        let token = req.header("authorization")
        console.log(token)
        if(!token)  
            return res.status(403).json("Access denied")
        
        if(token.startsWith("Bearer ")) 
            token= token.slice(7, token.length).trimLeft()

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        // console.log("Mushahid ; this user is verified: ", req.user)
        next()

    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}