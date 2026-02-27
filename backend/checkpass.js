import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luxe_db').then(async () => {
    const users = await User.find({});
    let output = "DB USERS:\n";
    for (let u of users) {
        const match = await bcrypt.compare('password123', u.password);
        output += `${u.email} | ${u.password} | ${u.isAdmin} | Matches password123: ${match}\n`;
    }
    fs.writeFileSync('pass.txt', output);
    process.exit(0);
});
