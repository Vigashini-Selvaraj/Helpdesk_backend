import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const inspectUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected.");

        const users = await User.find({});
        console.log(`\n--- USER AUDIT (${users.length} users) ---`);

        users.forEach(u => {
            const isHash = u.password && u.password.startsWith("$2");
            const status = isHash ? "✅ Valid Hash" : "❌ PLAIN TEXT (INVALID)";
            console.log(`User: ${u.email}`);
            console.log(`Pass: ${u.password.substring(0, 15)}... [${status}]`);
            console.log("");
        });

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.connection.close();
    }
};

inspectUsers();
