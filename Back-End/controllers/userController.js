// routes for user login
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToke = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

// Route for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    } else {
      const token = createToke(user._id);
      return res.json({
        success: true,
        message: "User logged in successfully",
        user,
        token,
      });
    }

    y;
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// routes for user signup

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // ensure required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // checking user already exist or not
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    // validation email format and strong password

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToke(user._id);

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// Route for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        message: "Admin logged in successfully",
        token,
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
export { loginUser, registerUser, loginAdmin };
