import express from 'express';
import {signup,
  login,
  logout,
  updateAvatar} from '../controllers/user.controllers.js';
  import { getMe,updateAvatar,updateProfile } from '../controllers/user.controllers.js';

  import { verifyJWT } from '../middleware/auth.js';

  import { uploadProfilePic } from '../controllers/user.controllers.js';

  import upload from '../middleware/upload.js'

  const router= express.Router();

  router.post("/signup", signup);

// Login route
router.post("/login", login);

// Logout route (protected, only logged-in users can logout)
router.post("/logout", verifyJWT, logout);

// upload profile picture

router.post("/upload-profile-pic/:id", upload.single("profilePic"), uploadProfilePic);

router.get("/me", verifyJWT,getMe);

router.put("update",verifyJWT,uploadProfilePic);

router.put("/update-avatar", verifyJWT,upload.single("avatar"),updateAvatar)

export default router;

