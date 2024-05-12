import User from "./userModel.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id; // Get the logged in user's id from the request object

		// Find all users except the logged in user
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); 
		// Send the filtered users in the response
		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
