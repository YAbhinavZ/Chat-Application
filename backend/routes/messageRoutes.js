import express from "express";
import { Message } from "../models/messageModel.js";
import { Chat } from "../models/chatModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All message routes require authentication
router.use(protect);

// GET /api/chat/:chatId/messages - Fetch all messages for a chat
router.get("/:chatId/messages", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const isParticipant = chat.users.some(
      (u) => u.toString() === req.user._id.toString()
    );
    if (!isParticipant) {
      return res.status(403).json({ message: "Not authorized to view this chat" });
    }

    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/chat/:chatId/messages - Send a message
router.post("/:chatId/messages", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({ message: "Message content is required" });
    }

    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const isParticipant = chat.users.some(
      (u) => u.toString() === req.user._id.toString()
    );
    if (!isParticipant) {
      return res.status(403).json({ message: "Not authorized to send to this chat" });
    }

    const message = await Message.create({
      sender: req.user._id,
      content: content.trim(),
      chat: req.params.chatId,
    });

    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "name pic email");

    // Update chat's latestMessage
    await Chat.findByIdAndUpdate(req.params.chatId, {
      latestMessage: message._id,
    });

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
