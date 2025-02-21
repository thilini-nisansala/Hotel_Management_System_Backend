import User from '../models/user.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// Function to check if the user is an admin
export function isAdminValid(req) {
    return req.user && req.user.type === "admin";
}

//customer valid
export function isCustomerValid(req) {
    // Your validation logic
    return req.user && req.user.type === "customer";
}


// Get Users
export function getUsers(req, res) {
    User.find().then(usersList => {
        res.json({ list: usersList });
    }).catch(err => {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    });
}

// Post Users (Create a New User)
export function postUsers(req, res) {
    const userData = req.body;

    // Hash the password before storing it
    userData.password = bcrypt.hashSync(userData.password, 10);

    const newUser = new User(userData);
    newUser.save()
        .then(() => {
            res.status(201).json({ message: "User created successfully" });
        })
        .catch(err => {
            res.status(500).json({ message: "User creation failed", error: err.message });
        });
}

// Update Users
export function putUsers(req, res) {
    res.json({ message: "This is a PUT request" });
}

// Delete Users
export function deleteUsers(req, res) {
    res.json({ message: "This is a DELETE request" });
}

// Login User
export function loginUser(req, res) {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Compare the provided password with the hashed password stored in DB
            const isMatch = bcrypt.compareSync(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            // Create payload for JWT
            const payload = {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                type: user.type,
            };

            // Sign the token
            const token = Jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "4h" });

            res.json({
                message: "User logged in successfully",
                user: user,
                token: token,
            });
        })
        .catch(err => {
            res.status(500).json({ message: "Login failed", error: err.message });
        });
}
