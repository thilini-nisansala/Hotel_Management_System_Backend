import bodyParser from 'body-parser';
import express from 'express';
import usersRouter from './routes/usersRoute.js';
import mongoose    from 'mongoose';
import galleryItemRouter from './routes/gallaryitemRoute.js'; 
import  Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import categoryRouter from './routes/categoryRoute.js';
import roomRouter from './routes/roomRoute.js';
//import bookingRouter from './routes/bookingRoute.js'


dotenv.config()

const app = express()

app.use(bodyParser.json())

const connectionString = process.env.MONGO_URL;

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Fixing the space issue

    if (token) {
        Jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Failed:", err.message);
                return res.status(401).json({ message: "Unauthorized" }); // Correct response for an invalid token
            }
            req.user = decoded; // Store decoded user info
            next();
        });
    } else {
        req.user = null; // Explicitly set user to null if no token is provided
        next();
    }
});

mongoose.connect(connectionString).then(
    ()=>{
        console.log("connected to the database")
    }
).catch(
    ()=>{
        console.log("connection failed")
    }
)

app.use("/api/users",usersRouter)
app.use("/api/gallery",galleryItemRouter)
app.use("/api/category",categoryRouter)
app.use("/api/rooms",roomRouter)
//app.use("/api/bookings",bookingRouter)



app.listen(5000,(req,res)=>{
    console.log("server is running on port 5000 ")
});