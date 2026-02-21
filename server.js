import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

dotenv.config();

const app = express();

// Middleware
// CORS - Allow requests from your frontend
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://tracklyyhespdesk.netlify.app',
    process.env.FRONTEND_URL // Optional: add this as env var in Render
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow any localhost origin
        if (origin.startsWith('http://localhost:')) {
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) === -1) {
            console.log("Blocked by CORS:", origin); // Log the origin that is being blocked
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reminders", reminderRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Student Helpdesk Backend Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
