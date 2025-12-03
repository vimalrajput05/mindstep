import express from 'express';
import {signup,
  login,
  logout} from '../controllers/user.controllers.js';

  import { verifyJWT } from '../middleware/auth.js';

  import { uploadProfilePic } from '../controllers/user.controllers.js';

  const router= express.Router();

  router.post("/signup", signup);

// Login route
router.post("/login", login);

// Logout route (protected, only logged-in users can logout)
router.post("/logout", verifyJWT, logout);

// upload profile picture

router.post("/upload-profile-pic/:id", upload.single("profilePic"), uploadProfilePic);

export default router;

