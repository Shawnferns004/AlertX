import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  type: String,
  description: String,
  location: String,
  imageUrl: String, 
  severity: String,
  priority: String,
  department: String,
  locationName: String,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });  // Enables createdAt and updatedAt

const Report = mongoose.model('Report', reportSchema);

export default Report;
