import express from "express";
import Reminder from "../models/Reminder.js";

const router = express.Router();

// GET all reminders for a specific user
router.get("/:userId", async (req, res) => {
    try {
        const reminders = await Reminder.find({ user: req.params.userId, isCompleted: false }).sort({ createdAt: -1 });
        res.json(reminders);
    } catch (err) {
        res.status(500).json({ message: "Server error fetching reminders" });
    }
});

// CREATE a new reminder
router.post("/", async (req, res) => {
    try {
        const { userId, text, scheduledTime } = req.body;
        if (!userId || !text) {
            return res.status(400).json({ message: "User ID and text are required" });
        }

        const newReminder = new Reminder({
            user: userId,
            text,
            scheduledTime
        });

        await newReminder.save();
        res.status(201).json(newReminder);
    } catch (err) {
        res.status(500).json({ message: "Server error creating reminder" });
    }
});

// DELETE (Mark as completed or remove)
router.delete("/:id", async (req, res) => {
    try {
        await Reminder.findByIdAndDelete(req.params.id);
        res.json({ message: "Reminder deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error deleting reminder" });
    }
});

// CLEAR ALL for a user
router.delete("/clear/:userId", async (req, res) => {
    try {
        await Reminder.deleteMany({ user: req.params.userId });
        res.json({ message: "All reminders cleared" });
    } catch (err) {
        res.status(500).json({ message: "Server error clearing reminders" });
    }
});

export default router;
