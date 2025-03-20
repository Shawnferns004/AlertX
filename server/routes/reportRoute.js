import express from 'express';
import { addReport, getReport } from '../controller/report.js';
import { upload } from '../config/multer.js';

const reportRouter = express.Router();

reportRouter.post('/report', upload.single('image'), addReport);
reportRouter.get('/reports', getReport);

export default reportRouter;