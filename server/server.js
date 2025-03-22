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
import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import Report from "./models/Report.js"; // Import the Report model
import { initializeWebSocket } from './config/webSocket.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

initializeWebSocket(server)

// Connect to MongoDB and Cloudinary 
connectDB();
configureCloudinary();

app.use('/api', reportRouter);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
