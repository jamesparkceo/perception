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
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const interactWithGPT4 = async (text, sessionConfig) => {
    try {
        const response = await openai.createCompletion({
            model: "gpt-4-turbo",
            prompt: text,
            maxTokens: 150,
            stop: ["\n"],
            temperature: 0.7,
            presencePenalty: 0.6,
            frequencyPenalty: 0.5,
            ...sessionConfig,
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error interacting with GPT-4:', error);
        throw error;
    }
};
};

module.exports = { handleVoiceCommand, transcribeAudio, interactWithGPT4 };
const { SpeechConfig, AudioConfig, SpeechSynthesizer } = require("microsoft-cognitiveservices-speech-sdk");

const synthesizeSpeech = async (text) => {
    const speechConfig = SpeechConfig.fromSubscription(process.env.AZURE_SPEECH_KEY, process.env.AZURE_SERVICE_REGION);
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
    const audioConfig = AudioConfig.fromAudioFileOutput("path/to/audio.wav");
    const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
    const result = await synthesizer.speakTextAsync(text);
    synthesizer.close();
    return result.audioData;
};
};

module.exports = { handleVoiceCommand, transcribeAudio, interactWithGPT4, synthesizeSpeech };
module.exports = { handleVoiceCommand, transcribeAudio, interactWithGPT4, synthesizeSpeech };
const openaiGPT3_5 = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo"
});

let gpt4SessionId = null; // Store GPT-4 session ID for persistence

const manageGPT4Session = async () => {
    if (!gpt4SessionId) {
        const sessionResponse = await openai.createSession({
            model: "gpt-4-turbo",
        });
        gpt4SessionId = sessionResponse.data.id;
    }
    return gpt4SessionId;
};

const spinUpGPT3_5Instance = async (task) => {
    const response = await openaiGPT3_5.createCompletion({
        prompt: task,
        maxTokens: 150,
        stop: ["\n"],
    });
    return response.data.choices[0].text.trim();
};
