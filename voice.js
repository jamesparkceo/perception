// Manages voice command processing and responses
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const handleVoiceCommand = (voiceCommand, ws) => {
    openai.createCompletion("text-davinci-002", {
        prompt: voiceCommand,
        maxTokens: 150,
    }).then(response => {
        const reply = response.data.choices[0].text.trim();
        ws.send(`AI says: ${reply}`);
    }).catch(error => {
        console.error('Error from OpenAI:', error);
        ws.send('Error processing your voice command.');
    });
};

module.exports = { handleVoiceCommand };
