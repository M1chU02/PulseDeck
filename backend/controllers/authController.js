import User from "../models/User.js";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const generateToken = (userId) => {
  return sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// POST /api/auth/register
export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }); // FIX
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({
      token,
      user: { id: newUser._id, username, email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// POST /api/auth/login
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // FIX
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
