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
const speech = require('@google-cloud/speech');
const speechClient = new speech.SpeechClient();

const transcribeAudio = async (audioBuffer) => {
    const audio = { content: audioBuffer.toString('base64') };
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
    };
    const request = {
        audio: audio,
        config: config,
    };
    const [response] = await speechClient.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    return transcription;
};

module.exports = { handleVoiceCommand, transcribeAudio };
const openai = require('openai');

const interactWithGPT4 = async (text) => {
    const response = await openai.createCompletion({
        model: "text-davinci-002", // Update this to GPT-4 Turbo when available
        prompt: text,
        maxTokens: 150,
        stop: ["\n"],
    });
    return response.data.choices[0].text.trim();
};

module.exports = { handleVoiceCommand, transcribeAudio, interactWithGPT4 };
const textToSpeech = require('@google-cloud/text-to-speech');
const ttsClient = new textToSpeech.TextToSpeechClient();

const synthesizeSpeech = async (text) => {
    const request = {
        input: {text: text},
        voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
        audioConfig: {audioEncoding: 'MP3'},
    };
    const [response] = await ttsClient.synthesizeSpeech(request);
    return response.audioContent;
};

module.exports = { handleVoiceCommand, transcribeAudio, interactWithGPT4, synthesizeSpeech };
