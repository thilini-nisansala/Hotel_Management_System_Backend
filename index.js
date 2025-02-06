import bodyParser from 'body-parser';
import express from 'express';
import usersRouter from './routes/usersRoute.js';
import mongoose    from 'mongoose';
import galleryItemRouter from './routes/gallaryitemRoute.js'; 

const app = express()

app.use(bodyParser.json())

const connectionString = "mongodb+srv://tester2:321@cluster0.ppne1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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



app.listen(5000,(req,res)=>{
    console.log("server is running on port 5000 ")
});