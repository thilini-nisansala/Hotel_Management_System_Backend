import express from "express";
import { createRoom, deleteRoom, getRoomById, getRooms, getRoomsByCategory, updateRoom } from "../controllers/roomControllers.js";

const roomRouter = express.Router();

roomRouter.get("/", getRooms)
roomRouter.get("/by-category/:category", getRoomsByCategory)
roomRouter.get("/:roomId", getRoomById)
roomRouter.put("/:roomId", updateRoom)
roomRouter.post("/", createRoom)
roomRouter.delete("/:roomId", deleteRoom)

export default roomRouter

