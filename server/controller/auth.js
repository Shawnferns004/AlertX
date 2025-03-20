import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';


dotenv.config()

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({ 
      name, 
      email, 
      password, 
      verificationToken, 
      verified: false // Set verified to false initially
    });

    // Send verification email
    sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      message: 'User registered. Please verify your email.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Function to send verification email
const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `<p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
  Thank you for signing up! Please verify your email by clicking the button below.
</p>

<div style="text-align: center; margin: 20px 0;">
  <a href="${verificationUrl}" 
     style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; 
            font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 6px; 
            transition: background 0.3s ease-in-out;">
    Verify Email
  </a>
</div>

<p style="font-family: Arial, sans-serif; font-size: 14px; color: #666;">
  If the button doesn't work, copy and paste this link in your browser:
</p>

<p style="word-break: break-word;">
  <a href="${verificationUrl}" style="color: #007bff;">${verificationUrl}</a>
</p>`,
  });
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.verified) {
      return res.status(403).json({ message: 'Please verify your email first' });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).json({ error: "Invalid or missing token" });

  try {

    const user = await User.findOne({ verificationToken: token });
    

      if (!user) return res.status(400).json({ error: "Invalid token" });

      user.verified = true;
      user.verificationToken = null;
      await user.save();

      res.json({ success: true, message: "Email successfully verified!" });
  } catch (error) {
      console.error("Verification Error:", error);
      res.status(500).json({ error: "Server error", details: error.message });
  }
};
