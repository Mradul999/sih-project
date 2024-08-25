import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["farmer", "buyer"],
    },
    pincode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district:{
      type: String,
      required: true,

    },
    address: {
      type: String,
      required: true,
    },
   
    farmSize: {
      type: String,
      required: true,
    },
    khatoni:{
      type:String,
      required:true
      
    },
    aadhar:{
      type: String,
      required: true,
      unique: true,
    }
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
