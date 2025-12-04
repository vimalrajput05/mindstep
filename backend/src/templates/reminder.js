export const reminderTemplate = (event) => `
  <h2>Reminder: ${event.title}</h2>
  <p>Your event is scheduled for ${event.date}. Don’t forget!</p>
`;
