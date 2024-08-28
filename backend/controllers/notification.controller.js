import Notification from "../models/notification.model.js"

export const getNotifications = async(req, res) => {
    try {
        const userId = req.user._id;

        const notification = await Notification.find({ to: userId})
            .populate({
                path:"from",
                select: "username profileImg"
            })
        await Notification.updateMany({ to: userId}, {read: true});
        res.status(200).json({notification});
    } catch (error) {
        console.log("Error at GetNotification Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });        
    }
}

export const deleteNotification = async(req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId}, {read: true});
        res.status(200).json({message: "Notification deleted successfully"});
    } catch (error) {
        console.log("Error at deleteNotification Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });        
    }
}

export const deleteOneNotification = async(req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user._id
        const notification = await Notification.findById(notificationId);

        if(!notification) return res.status(400).json({ error: "Notification Not Found"});

        if(notification.to.toString() != userId.toString()){
            return res.status(403).json({ error: "Not Authorized"});
        }

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: "Notification Deleted Successful"})
    } catch (error) {
        console.log("Error at deleteOneNotification Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });        
    }
}