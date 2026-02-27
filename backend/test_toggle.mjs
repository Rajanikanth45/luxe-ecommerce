import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import http from 'http';

mongoose.connect('mongodb://127.0.0.1:27017/luxe_db').then(async () => {
    const User = (await import('./models/userModel.js')).default;
    const Product = (await import('./models/productModel.js')).default;

    const user = await User.findOne({});
    const product = await Product.findOne({});

    if (!user || !product) {
        console.log('Missing user or product');
        process.exit(1);
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, 'supersecretluxe', { expiresIn: '30d' });
    const cookie = `jwt=${token}`;

    const toggleData = JSON.stringify({ productId: product._id.toString() });

    const req = http.request({
        hostname: 'localhost',
        port: 5000,
        path: '/api/users/profile/wishlist',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(toggleData),
            'Cookie': cookie
        }
    }, (res) => {
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            console.log('Toggle Result:', rawData);
            process.exit(0);
        });
    });

    req.write(toggleData);
    req.end();
}).catch(console.error);
