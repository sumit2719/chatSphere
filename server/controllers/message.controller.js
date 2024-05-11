import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res) => {
    try {
        const {message} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id.toString();
        

        const conversation=await Conversation.findOne({
            participants: {$all: [senderId, recieverId]},
        })


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
        }
        res.status(201).json(newMessage);

    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}
