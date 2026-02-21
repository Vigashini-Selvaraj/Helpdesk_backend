import express from "express";
import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

const router = express.Router();

// CREATE Complaint (Student)
router.post("/", async (req, res) => {
    try {
        const { userId, title, description, type, urgency } = req.body;

        // Simple validation
        if (!userId || !title || !description || !type) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newComplaint = new Complaint({
            user: userId,
            title,
            description,
            type,
            urgency: urgency || "Medium"
        });

        await newComplaint.save();
        res.status(201).json({ message: "Complaint submitted successfully", complaint: newComplaint });

    } catch (err) {
        console.error("Error creating complaint:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET My Complaints (Student)
router.get("/my/:userId", async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// GET ALL Complaints (Admin)
router.get("/all", async (req, res) => {
    try {
        // Populate user details (name, email)
        const complaints = await Complaint.find({})
            .populate("user", "name email role")
            .sort({ createdAt: -1 });

        res.json(complaints);
    } catch (err) {
        console.error("Error fetching all complaints:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// UPDATE Status (Admin)
router.put("/:id/status", async (req, res) => {
    try {
        const { status, resolutionNote, adminFeedback } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status, resolutionNote, adminFeedback },
            { new: true }
        );

        if (!complaint) return res.status(404).json({ message: "Complaint not found" });

        res.json({ message: "Status updated", complaint });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE Complaint (Admin)
router.delete("/:id", async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.json({ message: "Complaint deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
