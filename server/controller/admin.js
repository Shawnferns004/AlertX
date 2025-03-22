import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';


dotenv.config()


const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'admin not found' });
    }

    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        department: admin.department,
        type : admin.type
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const adminRegister = async (req, res) => {
  try {
    const { name, email, password,type, department } = req.body;
    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await Admin.create({ 
      name, 
      email,
      type,
      department,
      password
    });

    res.status(201).json({
      message: 'Admin registered sucessfully.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const adminGet = async (req, res) => {
  const admin = await Admin.find();
  res.status(200).json(admin);
};


const adminEmailGet = async (req, res) => {
  try {
    const { email } = req.params;

    // Correct way to query by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const adminUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};


const adminDelete = async (req, res) => {
  try {
    const { id } = req.params; // Get the report ID from the request params

    const deleteAdmin = await Admin.findByIdAndDelete(id);

    if (!deleteAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export { adminEmailGet, adminLogin, adminRegister, adminDelete, adminGet, adminUpdate}