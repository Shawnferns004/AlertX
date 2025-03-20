import { v2 as cloudinary } from 'cloudinary';
import Report from '../models/Report.js';
import axios from 'axios';
import FormData from 'form-data';

const addReport = async (req, res) => {
    const { type, description, location, locationName } = req.body;

    if (!req.file) {
        return res.status(400).send('No image file uploaded');
    }

    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (error, result) => {
            if (error) {
                console.error('Error uploading image to Cloudinary:', error);
                return res.status(500).send('Error uploading image');
            }

            // Prepare the image file to send to Flask API
            const form = new FormData();
            form.append('image', req.file.buffer, {
                filename: req.file.originalname,
                contentType: req.file.mimetype,
            });

            // Call Flask API for prediction
            const mlResponse = await axios.post('http://localhost:5001/predict', form, {
                headers: {
                    ...form.getHeaders(),
                },
            });

            console.log("ML Response:", mlResponse.data);

            const predictedType = mlResponse.data.type
            const predictedSeverity = mlResponse.data.severity
            const predictedPriority = mlResponse.data.priority
            const predictedDepartment = mlResponse.data.department

            // Save report with predicted type and image URL
            const newReport = new Report({
                type: predictedType,
                description,
                location,
                imageUrl: result.secure_url,
                severity: predictedSeverity,
                priority: predictedPriority,
                department: predictedDepartment,
                locationName,
            });

            await newReport.save();
            res.status(201).send('Report saved');
            console.log('Report saved');
        }).end(req.file.buffer);
    } catch (error) {
        console.error('Error processing report:', error);
        res.status(500).send('Error processing report');
    }
};


const getReport = async (req, res) => {
    const reports = await Report.find();
    res.status(200).json(reports);
};

export { addReport, getReport };