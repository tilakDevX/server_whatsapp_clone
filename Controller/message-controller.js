const { ConversationModel } = require("../Models/conversation.model");
const { MessageModel } = require("../Models/message.model")

const newMessage = async(req, res)=>{
    try {
        const new_message = new MessageModel(req.body)
        await new_message.save();

        const conversation = await ConversationModel.findByIdAndUpdate(req.body.conversationId,{message: req.body.text})
        // console.log(conversation)
        res.status(200).json("Message has been sent successfully.")
    } catch (error) {
        res.status(500).json({"Error while saving message into db: ": error})
        console.log("Error while saving message into db: ", error)

    }
}

const getMessage = async(req, res)=>{

    try {
        
        const messages = await MessageModel.find({conversationId: req.params.id})
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).send({"Error while getting all messages from db ": error})
        console.log("Error while getting all messages from db ", error)
        
    }
}

module.exports = {newMessage,getMessage}