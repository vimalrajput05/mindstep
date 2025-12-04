// src/jobs/eventReminderJob.js
import cron from "node-cron";
import Event from "../models/Event.js";
import { sendEmail } from "../utils/sendemail.js";
import { reminderTemplate } from "../templates/reminder.js";

cron.schedule("0 0 * * *", async () => {   // daily midnight
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Sare events jo kal ke liye scheduled hain
  const events = await Event.find({ date: tomorrow });

  for (const event of events) {
    await sendEmail(
      event.user.email,
      "Event Reminder",
      reminderTemplate(event)
    );
  }

  console.log("✅ Reminder emails sent for tomorrow’s events");
});
