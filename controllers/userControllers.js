import User from '../models/user.js';


// Get Users
export function getUsers(req, res) {
 
    User.find().then(
        (usersList)=>{
            res.json({
                list : usersList
            })

        }
    )
}

// Post Users (Create a New User)
export function postUsers(req, res) {
  const userData = req.body;

  const newUser = new User(userData);
  newUser
    .save()
    .then(() => {
      res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "User creation failed",
        error: err.message,
      });
    });
}

// Update Users
export function putUsers(req, res) {
  res.json({
    message: "This is a PUT request",
  });
}

// Delete Users
export function deleteUsers(req, res) {
  res.json({
    message: "This is a DELETE request",
  });
}
