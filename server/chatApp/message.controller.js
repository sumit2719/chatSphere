import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res) => {
    try {
        const {message} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id.toString();
        console.log(senderId);
        

        let conversation=await Conversation.findOne({
            participants: {$all: [senderId, recieverId]},
        })

        console.log("trigger 2");
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, recieverId]
            })
        }

        
        console.log("Trigger 3")


        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }
        await newMessage.save();
        res.status(201).json(newMessage);

    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}
