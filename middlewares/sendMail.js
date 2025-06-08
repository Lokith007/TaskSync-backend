const nodemailer = require("nodemailer");
const Task = require("../models/task");
const User = require("../models/user");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createMessageForUser = (user, tasksAssigned, tasksCompleted) => {
  const efficiency = tasksAssigned === 0 ? 0 : ((tasksCompleted / tasksAssigned) * 100).toFixed(2);

  return {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "📊 Your Weekly TaskSync Productivity Report",
    text: `Hi ${user.username}!\n\nHere’s your weekly productivity summary from TaskSync:\n\n• Tasks Completed: ${tasksCompleted}\n• Tasks Assigned: ${tasksAssigned}\n• Efficiency: ${efficiency}%\n\nKeep up the great work and continue staying organized!\n\n- Team TaskSync`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; color: #333;">
        <h2>Hey ${user.username} 👋</h2>
        <p>Here's your <strong>weekly productivity recap</strong> from <span style="color:#007bff;">TaskSync</span>:</p>
        <ul style="font-size: 16px;">
          <li><strong>Tasks Completed:</strong> ${tasksCompleted}</li>
          <li><strong>Tasks Assigned:</strong> ${tasksAssigned}</li>
          <li><strong>Efficiency:</strong> <span style="color: green;">${efficiency}%</span></li>
        </ul>
        <p>You're doing awesome 🚀 — keep syncing, keep succeeding!</p>
        <p style="margin-top: 20px; font-size: 14px; color: #888;">— The TaskSync Team</p>
      </div>
    `,
  };
};

const sendWeeklyReports = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      try {
        const tasks = await Task.find({ assignedTo: user._id });
        const tasksAssigned = tasks.length;
        const tasksCompleted = tasks.filter(task => task.completed).length;

        const message = createMessageForUser(user, tasksAssigned, tasksCompleted);
        await transporter.sendMail(message);

        console.log(`✅ Email sent to ${user.email}`);
      } catch (userEmailError) {
        console.error(`❌ Failed to send email to ${user.email}:`, userEmailError.message);
      }
    }

    console.log("All weekly reports attempted.");
  } catch (error) {
    console.error("Failed to fetch users or tasks:", error.message);
  }
};

module.exports = { sendWeeklyReports };
