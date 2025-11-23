import express from 'express';
import {signup,
  login,
  logout} from '../controllers/user.controllers.js';

  import { verifyJWT } from '../middleware/auth.js';

  const router= express.Router();

  router.post("/signup", signup);

// Login route
router.post("/login", login);

// Logout route (protected, only logged-in users can logout)
router.post("/logout", verifyJWT, logout);

export default router;

