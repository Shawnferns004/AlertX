import mongoose from 'mongoose';


const reportSchema = new mongoose.Schema({
  type: String,
  description: String,
  location: String,
  imageUrl: String, 
  severity: String,
  priority:String,
  department: String,
  locationName:String
});

const Report =  mongoose.model('Report', reportSchema);

export default Report