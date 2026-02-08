import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Academic", "Infrastructure", "Hostel", "Other"],
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "In Progress", "Resolved"],
    },
    urgency: {
        type: String,
        default: "Medium",
        enum: ["Low", "Medium", "High", "Critical"],
    },
}, { timestamps: true });

export default mongoose.model("Complaint", ComplaintSchema);
