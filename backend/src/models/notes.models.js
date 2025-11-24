import mongoose from "mongoose";

const NoteSchema= new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true,
    },
     description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to User model
    required: true,
  },

},{timestamps:true})

export const Note = mongoose.model("Note", NoteSchema)