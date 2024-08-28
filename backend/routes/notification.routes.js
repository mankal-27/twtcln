import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getNotifications, deleteNotification, deleteOneNotification } from '../controllers/notification.controller.js'

const router = express.Router();

router.get('/', protectRoute, getNotifications);
router.delete('/', protectRoute, deleteNotification)
router.delete('/:id', protectRoute, deleteOneNotification)

export default router;