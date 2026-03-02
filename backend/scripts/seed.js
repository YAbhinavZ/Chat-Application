import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chatapp");
    console.log("MongoDB connected");

    // Clear existing data (optional - remove if you want to preserve data)
    await User.deleteMany({});
    await Chat.deleteMany({});
    console.log("Cleared existing data");

    // Create users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const users = await User.insertMany([
      { name: "John Doe", email: "john@example.com", password: hashedPassword },
      { name: "Piyush", email: "piyush@example.com", password: hashedPassword },
      { name: "Guest User", email: "guest@example.com", password: hashedPassword },
      { name: "Anthony", email: "anthony@example.com", password: hashedPassword },
      { name: "Jane Doe", email: "jane@example.com", password: hashedPassword },
    ]);

    const [john, piyush, guest, anthony, jane] = users;

    // Create chats
    await Chat.insertMany([
      {
        chatName: "John Doe",
        isGroupChat: false,
        users: [john._id, piyush._id],
      },
      {
        chatName: "Guest User",
        isGroupChat: false,
        users: [guest._id, piyush._id],
      },
      {
        chatName: "Anthony",
        isGroupChat: false,
        users: [anthony._id, piyush._id],
      },
      {
        chatName: "Friends",
        isGroupChat: true,
        users: [john._id, piyush._id, guest._id],
        groupAdmin: guest._id,
      },
      {
        chatName: "Jane Doe",
        isGroupChat: false,
        users: [jane._id, piyush._id],
      },
      {
        chatName: "Chill Zone",
        isGroupChat: true,
        users: [john._id, piyush._id, guest._id],
        groupAdmin: guest._id,
      },
    ]);

    console.log("Seed completed successfully!");
    console.log("Test users: piyush@example.com, john@example.com (password: password123)");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedData();
