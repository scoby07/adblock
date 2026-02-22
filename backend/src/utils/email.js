const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send email
exports.sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
      text,
    });

    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

// Send welcome email
exports.sendWelcomeEmail = async (user) => {
  await exports.sendEmail({
    to: user.email,
    subject: 'Welcome to AdBlock Pro!',
    html: `
      <h1>Welcome to AdBlock Pro, ${user.name}!</h1>
      <p>Thank you for joining us. Start enjoying a cleaner, faster, and more private browsing experience.</p>
      <a href="${process.env.CLIENT_URL}/dashboard">Go to Dashboard</a>
    `,
  });
};
