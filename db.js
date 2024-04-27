// Handles database interactions
const { MongoClient } = require('mongodb');

const connectToDatabase = async () => {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        return client.db('chatApp');
    } catch (e) {
        console.error('Failed to connect to database:', e);
        throw e;
    }
};

module.exports = { connectToDatabase };

module.exports = { connectToDatabase };
