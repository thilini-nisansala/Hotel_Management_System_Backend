import mongoose from "mongoose";

// Define the User Schema
const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true, // Fix typo "inique" to "unique"
      },
       password : {
        type : String,
        required : true
       },
       firstName : {
        type : String,
        required : true
       },
       lastName : {
        type : String,
        required : true
       },
       type :{  
        type : String,
        required : true, 
        default : "customer"
      },
      whatsApp : {
        type : String,
        required : true
      },
      phone : {
        type : String,
        required : true
      },
      disabled : {  
        type : Boolean,
        required : true,
        default : false
      },
      emailVerified : {  
        type : Boolean,
        required : true,
        default : false
      }
    }
  )
  
  // Create the User Model
  const User = mongoose.model("User", userSchema);

export default User;