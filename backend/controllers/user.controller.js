import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";


export const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password");
        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in GetUserProfile Controller: ", error.message);
        res.status(500).json({error: error.message})
    }
}

export const followUnfollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString()) {
			return res.status(400).json({ error: "You can't follow/unfollow yourself" });
		}

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow the user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow the user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			// Send notification to the user
			const newNotification = new Notification({
				type: "follow",
				from: req.user._id,
				to: userToModify._id,
			});

			await newNotification.save();

			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (error) {
		console.log("Error in followUnfollowUser: ", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("11", userId);

        const user = await User.findById(userId).select("following");
        const usersFollowedByMe = user.following; // Access the 'following' array

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId } // Exclude the current user
                }
            },
            { $sample: { size: 10 } } // Get a random sample of 10 users
        ]);

        const filteredUsers = users.filter(user => !usersFollowedByMe.includes(user._id.toString()));
        const suggestedUsers = filteredUsers.slice(0, 4);

        // Remove password before sending the response
        suggestedUsers.forEach(user => user.password = null);

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("Error in SuggestedUsers Controller", error.message);
        res.status(500).json({ error: error.message });
    }
}

export const updateUser = async(req, res) => {
    const { fullname, username, currentPassword, newPassword, email, bio, link } = req.body;
    let { profileImg, coverImg } = req.body;

    const userId = req.user._id

    try {
        let user = await User.findById(userId);
        if(!user) return res.status(400).json({message: "User not found"})

        if((!newPassword && currentPassword) || (newPassword && !currentPassword)){
            return res.status(400).json({error: "Please provide both current password and new password"});
        }

        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch) return res.status(400).json({error: "Current password is incorrect"})
            if(newPassword.length < 6){
                return res.status(400).json({error: "Password must be atleast 6 character long"})
            }   
            
            const salt = bcrypt.getSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if(profileImg){
            if(user.profileImg){
                await cloudinary.uploader.distroy(user.profileImg.split("/").pop().split(","))
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg)
            profileImg = uploadedResponse.secure_url;
        }

        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.distroy(user.profileImg.split("/").pop().split(","))
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg)
            coverImg= uploadedResponse.secure_url;
        }

        user.fullName = fullname || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        user = await user.save();
        //pasword should be null in response
        user.password = null;

        return res.status(200).json(user)

    } catch (error) {
        console.log("Error in updateUser", error.message);
        res.status(500).json({error: error.message})
    }
}