import bodyParser from 'body-parser';
import express from 'express';
import usersRouter from './routes/usersRoute.js';
import mongoose from 'mongoose';
import galleryItemRouter from './routes/gallaryitemRoute.js'; 
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import categoryRouter from './routes/categoryRoute.js';
import roomRouter from './routes/roomRoute.js';
import bookingRouter from './routes/bookingRoute.js'; 

dotenv.config();

const app = express();

app.use(bodyParser.json());

const connectionString = process.env.MONGO_URL;

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); 

    if (token) {
        Jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Failed:", err.message);
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = decoded;
            next();
        });
    } else {
        req.user = null;
        next();
    }
});

mongoose.connect(connectionString)
    .then(() => console.log("Connected to the database"))
    .catch(() => console.log("Connection failed"));

app.use("/api/users", usersRouter);
app.use("/api/gallery", galleryItemRouter);
app.use("/api/category", categoryRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter); // 

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
