import express from "express";
import { createEvent, getEvents, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { uploadEventImage } from "../controllers/event.controllers.js";
const router = express.Router();

// Create Event
router.post("/", verifyJWT, createEvent);

// Get All Events (user-specific)
router.get("/", verifyJWT, getEvents);

// Update Event
router.put("/:id", verifyJWT, updateEvent);

// Delete Event
router.delete("/:id", verifyJWT, deleteEvent);

// upload event image

router.post("/upload-event-image/:id", upload.single("eventImage"), uploadEventImage);

export default router;
