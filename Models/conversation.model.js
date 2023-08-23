const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members: { type: Array },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const ConversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = { ConversationModel };
