import mongoose from 'mongoose';
import User from './models/userModel.js';

mongoose.connect('mongodb://127.0.0.1:27017/luxe_db').then(async () => {
    console.log('Connected to DB');
    const admin = await User.findOne({ email: 'admin@example.com' });
    console.log('ADMIN FOUND:', admin);
    if (admin) {
        console.log('PASSWORD MATCH?', await admin.matchPassword('password123'));
    }
    process.exit(0);
}).catch(console.error);
