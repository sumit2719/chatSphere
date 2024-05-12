import generativeResponse from "../Gemini/generateiveResponse.js";
import Conversation from "./conversationModel.js";
import Message from "./messageModel.js";
import User from "../User/userModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Send Message
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		// Check if conversation already exists
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}
		
		// Create new message
		let newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}


		// AI response
		const receiver = await User.findById(receiverId);
		if(!receiver.active){
			try {
				// const response=await generativeResponse();
				const responsePromise = generativeResponse();
       			const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000));
       			const response = await Promise.race([responsePromise, timeoutPromise]).catch(() => 'User is busy');
				let newMessage = new Message({
					senderId: receiverId,
					receiverId: senderId,
					message: response,
				}); await newMessage.save();
				conversation.messages.push(newMessage._id);	

				}catch (error) {
				console.log("Gen AI error: ", error.message);
			}
		}


		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Get Messages
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); 

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Set Status
export const setStatus = async (req, res) => {
	try {
		const userId = req.user._id; 
        const { status } = req.params;

        // Find the user in the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's active status
        user.active = status === 'true'; // Assuming 'true' or 'false' strings are passed in the URL

        // Save the updated user
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
		
	} catch (error) {
		console.log("Error in setStatus controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
