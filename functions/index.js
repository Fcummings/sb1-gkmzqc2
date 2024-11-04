const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

exports.sendEmail = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snap, context) => {
    const newValue = snap.data();
    
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient@example.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${newValue.name}
        Email: ${newValue.email}
        Message: ${newValue.message}
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });