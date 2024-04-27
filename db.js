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

const storeChatMessage = async (sessionId, message) => {
    const db = await connectToDatabase();
    await db.collection('chatMessages').insertOne({ sessionId, message, timestamp: new Date() });
};

const retrieveChatMessages = async (sessionId) => {
    const db = await connectToDatabase();
    return await db.collection('chatMessages').find({ sessionId }).toArray();
};

const storeContext = async (sessionId, context) => {
    const db = await connectToDatabase();
    await db.collection('contexts').updateOne({ sessionId }, { $set: { context } }, { upsert: true });
};

const retrieveContext = async (sessionId) => {
    const db = await connectToDatabase();
    const result = await db.collection('contexts').findOne({ sessionId });
    return result ? result.context : null;
};

module.exports = { connectToDatabase, storeChatMessage, retrieveChatMessages, storeContext, retrieveContext };

module.exports = { connectToDatabase };

module.exports = { connectToDatabase };
