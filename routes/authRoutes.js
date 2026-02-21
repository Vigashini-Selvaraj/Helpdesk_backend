import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// REGISTER route (your existing one)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("🟢 REGISTRATION ATTEMPT:");
    console.log("   Name:", name);
    console.log("   Email:", email);
    console.log("   Role:", role);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    console.log("✅ User registered successfully:", email);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ REGISTRATION ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// LOGIN route (fixed)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔵 LOGIN ATTEMPT:", email);
    console.log("🔑 PASSWORD RECEIVED:", password); // strictly for debugging

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ USER NOT FOUND");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("✅ USER FOUND:", user.email);
    console.log("🔒 STORED HASH:", user.password);

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("❓ IS MATCH RESULT:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Login success
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
