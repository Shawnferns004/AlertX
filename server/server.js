import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.js';
import reportRouter from './routes/reportRoute.js';
import configureCloudinary from './config/cloudinary.js';
import connectDB from './config/mongoDb.js';
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB and Cloudinary 
connectDB()
configureCloudinary()

// API to submit a report
app.use('/api',reportRouter)
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});