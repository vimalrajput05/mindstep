import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import "./src/jobs/eventReminderJob.js"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieParser());

import authRoutes from "./routes/user.routes.js"

app.use("/api/auth", authRoutes);

import noteRoutes from "./routes/note.routes.js";

app.use("/api/notes", noteRoutes);


export { app };
