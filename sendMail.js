const nodemailer=require("nodemailer");
require("dotenv").config();

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service:'gmail',
  host: "smtp.gmail.com",
  port: 587, 
  secure: false, // true for 465, false for other ports
  auth: {
    user: "tasksync.service@gmail.com",
    pass: "Celestius_123", 
  },
});

const message = {
  from: "tasksync.service@gmail.com",
  to: "receiver@gmail.com",
  subject: "📊 Your Weekly TaskSync Productivity Report",
  text: `Hi there!

Here’s your weekly productivity summary from TaskSync:

• Tasks Completed: ${tasksCompleted}
• Tasks Assigned: ${tasksAssigned}
• Efficiency: ${efficiency}%

Keep up the great work and continue staying organized!

- Team TaskSync`,
  html: `
    <div style="font-family: 'Segoe UI', sans-serif; color: #333;">
      <h2>Hey there 👋</h2>
      <p>Here's your <strong>weekly productivity recap</strong> from <span style="color:#007bff;">TaskSync</span>:</p>
      <ul style="font-size: 16px;">
        <li><strong>Tasks Completed:</strong> ${tasksCompleted}</li>
        <li><strong>Tasks Assigned:</strong> ${tasksAssigned}</li>
        <li><strong>Efficiency:</strong> <span style="color: green;">${efficiency}%</span></li>
      </ul>
      <p>You're doing awesome 🚀 — keep syncing, keep succeeding!</p>
      <p style="margin-top: 20px; font-size: 14px; color: #888;">
        — The TaskSync Team
      </p>
    </div>
  `
};


transporter.sendMail(message, (error, info) => {
  if (error) {
    return console.log("Error sending email:", error);
  }
  console.log("Email sent successfully:", info.response);
});
