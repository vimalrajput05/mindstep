import express from 'express';

import { createNote, getNotes, updateNote, deleteNote } from "../controllers/noteController.js";
import { verifyJWT }  from '../middleware/auth.js';

const router = express.Router();

router.post("/", verifyJWT, createNote);
router.get("/", verifyJWT, getNotes);
router.put("/:id", verifyJWT, updateNote);
router.delete("/:id", verifyJWT, deleteNote);

export default router;