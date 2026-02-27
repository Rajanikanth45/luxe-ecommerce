import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    toggleWishlist,
    getUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile/wishlist').post(protect, toggleWishlist);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
