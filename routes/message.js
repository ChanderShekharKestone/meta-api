const router = require("express").Router();
const verify = require("./verifyToken");
const Message = require("../model/Message");
const { messageValidation } = require("../validation/validation");

const mongoose = require("mongoose");
// Get message
router.post("/getMessages", verify, async (req, res) => {
  try {
    const allMessages = await Message.find(req.body);
    res.send(allMessages);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Get Message by roomname
router.post("/getMessage/:roomName", verify, async (req, res) => {
  try {
    const message = await Message.find({ chatRoomID: req.params.roomName });
    const markRead = await Message.updateMany(
      { chatRoomID: req.params.roomName },
      { $set: { status: "read" } }
    );
    res.send(message);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Save message
router.post("/saveMessage", verify, async (req, res) => {
  const { error } = await messageValidation(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }
  const message = new Message({
    emoji: req.body.emoji,
    message: req.body.message,
    messageType: req.body.messageType,
    chatRoomID: req.body.chatRoomID,
    createdAt: req.body.createdAt,
    sender: {
      _id: req.body.sender._id,
      role: req.body.sender.role,
      name: req.body.sender.name,
      email: req.body.sender.email,
    },
    receiver: {
      _id: req.body.receiver._id,
      role: req.body.receiver.role,
      name: req.body.receiver.name,
      email: req.body.receiver.email,
    },
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    replayMessage: req.body.replayMessage,
  });
  try {
    const savedMessage = await message.save();
    res.send(savedMessage);
  } catch (err) {
    console.log(err, "test");
    res.status(400).send(err);
  }
});

// Delete Message
router.post("/deleteMessage/:messageId", verify, async (req, res) => {
  try {
    const deleteMessage = await Message.deleteOne({
      _id: req.params.messageId,
    });
    res.send(deleteMessage);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get chatlist

router.post("/getChatList", verify, async (req, res) => {
  const userId = req.body._id;
  const getUsersChat = {
    $match: {
      $or: [
        { senderId: new mongoose.Types.ObjectId(userId) },
        { receiverId: new mongoose.Types.ObjectId(userId) },
      ],
    },
  };
  const getLastChat = {
    $group: {
      _id: "$chatRoomID",
      unread: {
        $sum: {
          $cond: [{ $eq: ["$status", "delivered"] }, 1, 0],
        },
      },
      lastChat: {
        $last: "$$ROOT",
      },
    },
  };

  try {
    let result = await Message.aggregate([getUsersChat, getLastChat]);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
