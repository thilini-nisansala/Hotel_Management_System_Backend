import express from 'express';
import { createRoom, deleteRoom, getRoomById, getRooms, getRoomsByCategory, updateRoom } from '../controllers/roomControllers.js';

const roomRouter = express.Router();

// Routes
roomRouter.post("/", createRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/:roomId", getRoomById);
roomRouter.get("/category/:category", getRoomsByCategory);
roomRouter.put("/:roomId", updateRoom);     // Updated to use roomId
roomRouter.delete("/:roomId", deleteRoom);  // Updated to use roomId

export default roomRouter;
