import { MongoClient } from 'mongodb';

async function run() {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    const db = client.db('luxe');
    const user = await db.collection('users').findOne({ email: 'admin@example.com' });
    console.log(user);
    process.exit();
}
run();
