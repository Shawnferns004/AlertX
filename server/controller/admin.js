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
        department: admin.department
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

const adminUpdate = async (req, res) => {
  try {
    const { id } = req.params; // Admin ID from URL params
    const { name, email, type, department } = req.body;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update only provided fields
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (type) admin.type = type;
    if (department) admin.department = department;

    await admin.save(); // Save updated details

    res.status(200).json({
      message: "Admin updated successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        type: admin.type,
        department: admin.department,
      },
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Something went wrong" });
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

export { adminLogin, adminRegister, adminDelete, adminGet, adminUpdate}