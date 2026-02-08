import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import fs from "fs";

dotenv.config();

const dumpUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({});

        let output = `Found ${users.length} users:\n\n`;

        const usersList = await User.find({});
        usersList.forEach(u => {
            const isHash = u.password && u.password.startsWith("$2");
            output += `ID: ${u._id}\n`;
            output += `Name: ${u.name}\n`;
            output += `Email: ${u.email}\n`;
            output += `Role: ${u.role}\n`;
            output += `Password: ${u.password}\n`;
            output += `Is Valid Hash: ${isHash ? "YES" : "NO"}\n`;
            output += "------------------------------------------------\n";
        });

        fs.writeFileSync("user_dump.txt", output);
        console.log("Dump written to user_dump.txt");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.connection.close();
    }
};

dumpUsers();
