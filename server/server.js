import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.js';
import reportRouter from './routes/reportRoute.js';
import configureCloudinary from './config/cloudinary.js';
import connectDB from './config/mongoDb.js';
import dotenv from "dotenv";
import adminRouter from './routes/adminRoute.js';

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); // Exit process to restart properly
});


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
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  
  console.log(`Server running on http://localhost:${PORT}`);
});