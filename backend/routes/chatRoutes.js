import express from "express";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All chat routes require authentication
router.use(protect);

// GET /api/chat - Fetch all chats for logged-in user
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/chat - Create a new chat (one-on-one or group)
router.post("/", async (req, res) => {
  try {
    const { userId, chatName, isGroupChat, users } = req.body;

    if (isGroupChat) {
      if (!chatName || !users || users.length < 2) {
        return res
          .status(400)
          .json({ message: "Group chat requires name and at least 2 users" });
      }
      const allUsers = [req.user._id, ...users];
      const chat = await Chat.create({
        chatName,
        isGroupChat: true,
        users: allUsers,
        groupAdmin: req.user._id,
      });
      const populatedChat = await Chat.findById(chat._id)
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      res.status(201).json(populatedChat);
    } else {
      // One-on-one chat
      if (!userId) {
        return res.status(400).json({ message: "UserId is required" });
      }
      const existingChat = await Chat.findOne({
        isGroupChat: false,
        users: { $all: [req.user._id, userId] },
      })
        .populate("users", "-password")
        .populate("latestMessage");

      if (existingChat) {
        return res.json(existingChat);
      }

      const chat = await Chat.create({
        isGroupChat: false,
        users: [req.user._id, userId],
      });
      const populatedChat = await Chat.findById(chat._id)
        .populate("users", "-password");
      res.status(201).json(populatedChat);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/chat/:id - Fetch single chat
router.get("/:id", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.users.some((u) => u._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: "Not authorized to access this chat" });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
