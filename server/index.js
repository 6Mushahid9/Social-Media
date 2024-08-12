import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import { promiseHooks } from "v8"
import {register} from "./controllers/auth.js"
import authRoutes from "./routes/auth.js"

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url)   // __filename= 'E:\web dev\Social Media\server\index.js' 
const __dirname = path.dirname(__filename)          // __dirname=  'E:\web dev\Social Media\server'
// In CommonJS modules (using require), __filename and __dirname is available by default, 
// but in ES modules, you have to create them manually using this approach.
dotenv.config()
const app= express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: "true"}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:"true"}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))
// app.use("/assets", ...): "/assets" is the URL path prefix. When a user accesses a URL that starts with "/assets", this middleware will serve the corresponding file from the public/assets directory.
// For Example: If you have a file named "logo.png" in the public/assets directory, it would be accessible via the URL http://yourdomain.com/assets/logo.png.
// express.static() is a built-in middleware function. It serves static files, such as images, CSS files, JavaScript files, etc.
// path.join(__dirname, "public/assets") would resolve to "E:/web dev/Social Media/server/public/assets"

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets")
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload= multer({storage})

// Routes with files
app.post("/auth/register", upload.single("picture"), register)
// since this above line is using upload we cnnot move it to other file location

// Routes
app.use("/auth", authRoutes)

// MONGOOSE SETUP
const PORT= process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=> console.log(`App runing on Port: ${PORT}`))
})
.catch((error)=>{
    console.log(error, "Unable to connect to DB")
}) 