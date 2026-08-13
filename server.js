import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// API route for Contact Form submission
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  // Log contact details (in production, integration with EmailJS/SendGrid/Nodemailer goes here)
  console.log('--- NEW CONTACT MESSAGE RECEIVED ---');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Subject: ${subject || 'No Subject'}`);
  console.log(`Message: ${message}`);
  console.log('-----------------------------------');

  return res.status(200).json({ 
    success: true, 
    message: 'Your message has been sent successfully! Sanket will get back to you soon.' 
  });
});

// Fallback: Send index.html for any client-side routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
