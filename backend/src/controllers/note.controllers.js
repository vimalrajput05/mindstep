import {Note} from "..//models/notes.models.js"

import {asyncHandler}from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const createNote= asyncHandler(async (req,res) => {
      const { title, description } = req.body;

        if (!title || !description) {
      return ApiError(res, 400, "Title and description are required");
    }
      const note = await Note.create({
        title,
      description,
      userId: req.user.id,
      });
      return res.status(201).json(new ApiResponse(201,note));

});

const getUserNotes= asyncHandler(async (req,res)=>{
    const notes= await Note.find({userId:req.user.id});
    return res.status(200).json(new ApiResponse(200,notes));
});


const updateNote = asyncHandler(async (req,res)=>{
    const {id}= req.params;
    const note = await Note.findById(id);

  if (!note) {
   throw new ApiError(404,"Note not found");
    
  }
  if(note.userId.toString() !== req.user.id) {
        throw new ApiError(403,"you are not authorized to update this note");
       
    }
     note.title=req.body.title||note.title;
         note.description = req.body.description || note.description;
        note.updatedAt = Date.now();
        await note.save();

        return res.status(200).json(new ApiResponse(200,
            "Note updated successfully",
            note))
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);

  if(!note){
    throw new ApiError(404,"Note note found");

  }

  if (note.userId.toString() !== req.user.id) {
  throw new ApiError(403,"you are not authorized to delete this note")
}

 await note.deleteOne();
 return res.status(200).json(new ApiResponse(200,"Note deleted successfully"))
});

export {
    createNote,
    getUserNotes,
    updateNote,
    deleteNote

}
    
