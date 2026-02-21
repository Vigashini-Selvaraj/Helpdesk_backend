import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    scheduledTime: {
        type: Date,
    }
}, { timestamps: true });

export default mongoose.model("Reminder", ReminderSchema);
