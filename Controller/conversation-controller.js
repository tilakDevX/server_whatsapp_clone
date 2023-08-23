const { ConversationModel } = require("../Models/conversation.model");

 const newConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const exist = await ConversationModel.findOne({
      members: { $all: [receiverId, senderId] },
    });

    if (exist) {
      return res.status(200).json("Conversation already exists.");
    }

    const newConversation = new ConversationModel({
      members: [receiverId, senderId],
    });
    await newConversation.save();

    return res.status(200).json("Conversation saved successfully.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {newConversation}