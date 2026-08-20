// server.js – lightweight email relay using Express & Nodemailer
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure transporter – Gmail SMTP (set GMAIL_APP_PASSWORD env var)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Muhammadatif04586@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const mailOptions = {
    from: 'Muhammadatif04586@gmail.com',
    to: 'Muhammadatif04586@gmail.com',
    subject: `New portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    replyTo: email,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Email send error:', err);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }
    console.log('Email sent:', info.response);
    res.json({ success: true, message: 'Message sent' });
  });
});

app.listen(PORT, () => {
  console.log(`Contact server listening at http://localhost:${PORT}`);
});
