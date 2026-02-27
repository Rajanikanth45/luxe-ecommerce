import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).populate('wishlist');

        if (!user) {
            return res.status(401).json({ message: 'No account found with this email' });
        }

        const isPasswordMatch = await user.matchPassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Incorrect password entered' });
        }

        // Authentication successful
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            loyaltyPoints: user.loyaltyPoints,
            wishlist: user.wishlist.filter(item => item != null),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login: ' + error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // First registered user is admin
    const isFirstUser = (await User.countDocuments({})) === 0;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            isAdmin: isFirstUser,
        });

        if (user) {
            generateToken(res, user._id);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                loyaltyPoints: user.loyaltyPoints,
                wishlist: user.wishlist.filter(item => item != null),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                loyaltyPoints: user.loyaltyPoints,
                wishlist: user.wishlist.filter(item => item != null),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        let user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();
            await updatedUser.populate('wishlist');

            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                loyaltyPoints: updatedUser.loyaltyPoints,
                wishlist: updatedUser.wishlist.filter(item => item != null),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle item in wishlist
// @route   POST /api/users/profile/wishlist
// @access  Private
const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);

        if (user) {
            // Safely filter out any null/undefined entries first
            user.wishlist = user.wishlist.filter(id => id != null);

            const isItemInWishlist = user.wishlist.some(id => id.toString() === String(productId));

            if (isItemInWishlist) {
                user.wishlist = user.wishlist.filter(id => id.toString() !== String(productId));
            } else {
                user.wishlist.push(productId);
            }

            await user.save();

            // Re-fetch strictly populated user to ensure the frontend gets objects, not strings.
            const updatedUser = await User.findById(user._id).populate('wishlist');

            // Clean up any nulls resulted from populated deleted products
            const validWishlist = updatedUser.wishlist.filter(item => item != null);

            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                loyaltyPoints: updatedUser.loyaltyPoints,
                wishlist: validWishlist,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    toggleWishlist,
    getUsers
};
