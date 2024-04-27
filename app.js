const express = require('express')
const app = express()
const port = process.env.PORT || 3000


const server = require('http').createServer(app)
const WebSocket = require('ws')
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Handling specific tags for actions
    const tagActionMatch = message.match(/\[(\d+)\]/);
    if (tagActionMatch) {
      const actionCode = parseInt(tagActionMatch[1], 10);
      switch (actionCode) {
        case 20:
          // Example action: git commit
          const commitMessage = 'Automated commit from chat';
          require('child_process').exec(`git commit -am "${commitMessage}"`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
          });
          break;
        default:
          console.log('No action defined for this code');
      }
    }
    // Example of handling a voice command
    if (message.startsWith('voice:')) {
      const voiceCommand = message.slice(6);
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
    }
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.send('Welcome to the chat!');
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello, world!',
  })
})

server.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
