import mongoose from "mongoose";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken"
const userSchema= new mongoose.Schema({

    // Required at signup
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true, 
        minlength:6
    },

     // Profile related (optional, editable later)
    bio: {
      type: String,
       trim: true,
      maxlength: 200,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    profilePic: {
      type: String, // Cloudinary URL
      default: "https://res.cloudinary.com/demo/image/upload/default-avatar.png",
    },
    coverImage: {
      type: String, // Optional banner image
    },

     //  System fields

    role:{
        type:String,
        enum:["user","admin"],
        default:"user",

    },
      plan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    planExpiresAt: {
      type: Date,
    },
       
},{timestamps:true});


userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};




export const User = mongoose.model("User", userSchema);