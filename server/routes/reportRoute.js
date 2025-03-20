import express from 'express';
import { addReport, deleteReport, getReport, updateReport } from '../controller/report.js';
import { upload } from '../config/multer.js';

const reportRouter = express.Router();

reportRouter.post('/report', upload.single('image'), addReport);

reportRouter.get('/reports', getReport);

reportRouter.put('/report/:id', updateReport);

reportRouter.delete('/report/:id', deleteReport);

export default reportRouter;
