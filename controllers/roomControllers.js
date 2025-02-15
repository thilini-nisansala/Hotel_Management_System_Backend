import Room from "../models/room.js";

// Create a new room (admin-only)
export function createRoom(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.type !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }

    const newRoom = new Room(req.body);
    newRoom.save()
        .then((result) => {
            res.status(201).json({
                message: "Room created successfully",
                room: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Room creation failed",
                error: err.message
            });
        });
}

// Get all rooms (public)
export function getRooms(req, res) {
    Room.find()
        .then((rooms) => {
            res.json({ rooms });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to get rooms",
                error: err.message
            });
        });
}

// Get room by ID (public)
export function getRoomById(req, res) {
    const { id } = req.params;
    Room.findById(id)
        .then((room) => {
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }
            res.json({ room });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to get room",
                error: err.message
            });
        });
}

// Update a room by ID (admin-only)
export function updateRoom(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.type !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }

    const { id } = req.params;
    Room.findByIdAndUpdate(id, req.body, { new: true })
        .then((updatedRoom) => {
            if (!updatedRoom) {
                return res.status(404).json({ message: "Room not found" });
            }
            res.json({
                message: "Room updated successfully",
                room: updatedRoom
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to update room",
                error: err.message
            });
        });
}

// Delete a room by ID (admin-only)
export function deleteRoom(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.type !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }

    const { id } = req.params;
    Room.findByIdAndDelete(id)
        .then((deletedRoom) => {
            if (!deletedRoom) {
                return res.status(404).json({ message: "Room not found" });
            }
            res.json({ message: "Room deleted successfully" });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to delete room",
                error: err.message
            });
        });
}
