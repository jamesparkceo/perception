// Manages configuration settings
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    openaiApiKey: process.env.OPENAI_API_KEY,
    authToken: process.env.AUTH_TOKEN,
};
