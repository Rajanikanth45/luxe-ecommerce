import mongoose from 'mongoose';

const DB_URI = 'mongodb://127.0.0.1:27017/luxe_db';
const NEW_IMG = 'https://imagemakeover.net/wp-content/uploads/2024/04/heading-15.jpg?w=1024';

mongoose.connect(DB_URI).then(async () => {
    try {
        const Product = (await import('./models/productModel.js')).default;

        const products = await Product.find({ images: { $regex: '1550614000-4b95dd2478dc' } });
        console.log(`Found ${products.length} products to update`);

        for (const p of products) {
            const newImages = p.images.map(img =>
                img.includes('1550614000-4b95dd2478dc') ? NEW_IMG : img
            );

            await Product.updateOne({ _id: p._id }, { $set: { images: newImages } });
            console.log(`Updated images for product: ${p.name}`);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit(0);
    }
});
