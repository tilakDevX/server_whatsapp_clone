const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: { type: String },

  receiverId: { type: String },

  senderId: { type: String },

  text: { type: String },

  type: { type: String },
},
{
    timestamps: true,
  }
);

const MessageModel = mongoose.model("message", messageSchema);

module.exports = { MessageModel };
