import mongoose from 'mongoose';
import Product from './models/productModel.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luxe_db').then(async () => {
    const p = await Product.findOne({});
    import('fs').then(fs => {
        fs.writeFileSync('prod.json', JSON.stringify(p, null, 2));
        process.exit(0);
    });
});
