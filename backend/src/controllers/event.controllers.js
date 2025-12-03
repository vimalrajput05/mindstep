import Event from "../models/eventModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Event } from "../models/event.models.js";

export const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, time } = req.body;

  if (!title || !date || !time) {
    throw new ApiError(400, "Title, date and time are required");
  }

  const event = await Event.create({
    title,
    description,
    date,
    time,
    userId: req.user._id
  });

  res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully"));
});


export const getEvents = asyncHandler(async (req, res) => {
  const { filter } = req.query;
  let query = { userId: req.user._id };

  if (filter === "upcoming") {
    query.date = { $gte: new Date() };
  } else if (filter === "past") {
    query.date = { $lt: new Date() };
  } else if (filter) {
    query.date = new Date(filter);
  }

  const events = await Event.find(query).sort({ date: 1 });

  res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, event, "Event updated successfully"));
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Event deleted successfully"));
});

export const uploadEventImage = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (!req.file?.path) {
    throw new ApiError(400, "No image file uploaded");
  }

  event.image = req.file.path; // Cloudinary URL
  await event.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { eventImage: event.image }, "Event image uploaded successfully"));
}); 

