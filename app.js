const express = require('express')
const app = express()
const port = process.env.PORT || 3000


const server = require('http').createServer(app)
const WebSocket = require('ws')
const { handleVoiceCommand } = require('./voice');
const { executeAction } = require('./actions');
const { verifyToken, verifyRole } = require('./auth');
const config = require('./config');
const { logError } = require('./helpers');

const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
ws.on('connection', function connection(ws, req) {
const { manageGPT4Session, spinUpGPT3_5Instance } = require('./voice');

const { processVoiceCommand } = require('./voice');

wss.on('connection', function connection(ws, req) {
    const { logInfo, logError } = require('./helpers');
    const { manageGPT4Session, interactWithGPT4, spinUpGPT3_5Instance } = require('./voice');

  const params = new URLSearchParams(req.url.split('?')[1]);
  const token = params.get('token');
  const role = params.get('role'); // Assuming role is passed as a query parameter

  if (!verifyToken(token)) {
    ws.close(1008, 'Unauthorized');
    return;
  }

  manageGPT4Session().then(sessionId => {
  const { storeChatMessage, retrieveChatMessages, storeContext, retrieveContext } = require('./db');

wss.on('connection', function connection(ws, req) {
    const { logInfo, logError } = require('./helpers');
    const { manageGPT4Session, interactWithGPT4, spinUpGPT3_5Instance } = require('./voice');

    const sessionId = req.headers['sec-websocket-key']; // Unique identifier for each WebSocket connection

    ws.on('message', function incoming(message) {
          if (message.startsWith('task:')) {
              spinUpGPT3_5Instance(message.slice(5)).then(response => {
                  ws.send(`GPT-3.5 response: ${response}`);
              }).catch(err => {
                  console.error('Error with GPT-3.5 instance:', err);
                  ws.send('Error processing your task.');
              });
          }
      });
  }).catch(err => {
      console.error('Error managing GPT-4 session:', err);
      ws.close(1011, 'Session error');
  });

  ws.on('message', function incoming(message) {
      if (message instanceof Buffer) { // Assuming binary data is audio
          processVoiceCommand(message, ws);
      } else {
          // Handle text messages as before
          if (message.startsWith('log:')) {
            logInfo('Fetching logs...');
            // Fetch and send logs (implementation depends on logging setup)
            ws.send('Logs: [Here are the logs]');
        } else if (message.startsWith('checkAI:')) {
            // Check AI tasks
            ws.send('AI Status: [AI is currently processing tasks]');
        } else if (message.startsWith('messageAI:')) {
            const aiName = message.split(':')[1];
            const aiMessage = message.split(':')[2];
            if (aiName === 'CEO') {
                interactWithGPT4(aiMessage, {session: manageGPT4Session()}).then(response => {
                    ws.send(`Message to CEO GPT-4: ${response}`);
                }).catch(err => {
                    logError('Error sending message to CEO GPT-4:', err);
                    ws.send('Error processing your message to CEO GPT-4.');
                });
            } else {
                // Handle other AI instances
                spinUpGPT3_5Instance(aiMessage).then(response => {
                    ws.send(`Response from GPT-3.5: ${response}`);
                }).catch(err => {
                    logError('Error with GPT-3.5 instance:', err);
                    ws.send('Error processing your task.');
                });
            }
        } else {
            console.log('received: %s', message);
            // Existing message handling
        }
      }
  });

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Handling specific tags for actions
    if (message.match(/\[(\d+)\]/)) {
      executeAction(parseInt(message.match(/\[(\d+)\]/)[1], ws);
    }
    // Example of handling a voice command
    if (message.startsWith('voice:'))
      handleVoiceCommand(message.slice(6), ws);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.send('Welcome to the chat!');
});
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws, req) {
    const { logInfo, logError } = require('./helpers');
    const { manageGPT4Session, interactWithGPT4, spinUpGPT3_5Instance } = require('./voice');

  const params = new URLSearchParams(req.url.split('?')[1]);
  const token = params.get('token');
  const role = params.get('role'); // Assuming role is passed as a query parameter

  if (token !== process.env.AUTH_TOKEN) {
    ws.close(1008, 'Unauthorized');
    return;
  }

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Handling specific tags for actions
    const tagActionMatch = message.match(/\[(\d+)\]/);
    if (tagActionMatch) {
      const actionCode = parseInt(tagActionMatch[1], 10);
      // Check role before executing action
      if (role !== 'admin') {
        ws.send('Unauthorized action.');
        return;
      }
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
    if (message.startsWith('voice:'))
      handleVoiceCommand(message.slice(6), ws);
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

server.listen(config.port, () => {
  console.log(`App is listening on port ${config.port}`)
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
const { processVoiceCommand } = require('./voice');

wss.on('connection', function connection(ws, req) {
    const { logInfo, logError } = require('./helpers');
    const { manageGPT4Session, interactWithGPT4, spinUpGPT3_5Instance } = require('./voice');

const { storeChatMessage, retrieveChatMessages, storeContext, retrieveContext } = require('./db');

wss.on('connection', function connection(ws, req) {
    const { logInfo, logError } = require('./helpers');
    const { manageGPT4Session, interactWithGPT4, spinUpGPT3_5Instance } = require('./voice');

    const sessionId = req.headers['sec-websocket-key']; // Unique identifier for each WebSocket connection

    ws.on('message', function incoming(message) {
        if (message instanceof Buffer) { // Assuming binary data is audio
            processVoiceCommand(message, ws);
        } else {
            if (message.startsWith('log:')) {
            logInfo('Fetching logs...');
            // Fetch and send logs (implementation depends on logging setup)
            ws.send('Logs: [Here are the logs]');
        } else if (message.startsWith('checkAI:')) {
            // Check AI tasks
            ws.send('AI Status: [AI is currently processing tasks]');
        } else if (message.startsWith('messageAI:')) {
            const aiName = message.split(':')[1];
            const aiMessage = message.split(':')[2];
            if (aiName === 'CEO') {
                interactWithGPT4(aiMessage, {session: manageGPT4Session()}).then(response => {
                    ws.send(`Message to CEO GPT-4: ${response}`);
                }).catch(err => {
                    logError('Error sending message to CEO GPT-4:', err);
                    ws.send('Error processing your message to CEO GPT-4.');
                });
            } else {
                // Handle other AI instances
                spinUpGPT3_5Instance(aiMessage).then(response => {
                    ws.send(`Response from GPT-3.5: ${response}`);
                }).catch(err => {
                    logError('Error with GPT-3.5 instance:', err);
                    ws.send('Error processing your task.');
                });
            }
        } else {
            console.log('received: %s', message);
            // Existing message handling
        }
        }
    });
});
const { verifyToken } = require('./auth');

wss.on('connection', function connection(ws, req) {
    const { logInfo, logError } = require('./helpers');
    const { manageGPT4Session, interactWithGPT4, spinUpGPT3_5Instance } = require('./voice');

    const token = req.headers['sec-websocket-protocol'];

    if (!verifyToken(token)) {
        ws.close(4001, 'Unauthorized');
        return;
    }

const { storeChatMessage, retrieveChatMessages, storeContext, retrieveContext } = require('./db');

wss.on('connection', function connection(ws, req) {
    const { logInfo, logError } = require('./helpers');
    const { manageGPT4Session, interactWithGPT4, spinUpGPT3_5Instance } = require('./voice');

    const sessionId = req.headers['sec-websocket-key']; // Unique identifier for each WebSocket connection

    ws.on('message', function incoming(message) {
        storeChatMessage(sessionId, message).catch(err => console.error('Error storing chat message:', err));

        if (message instanceof Buffer) {
            processVoiceCommand(message, ws).catch(error => {
                console.error('Error processing voice command:', error);
                ws.send('Error processing your voice command.');
            });
        } else {
            if (message.startsWith('log:')) {
            logInfo('Fetching logs...');
            // Fetch and send logs (implementation depends on logging setup)
            ws.send('Logs: [Here are the logs]');
        } else if (message.startsWith('checkAI:')) {
            // Check AI tasks
            ws.send('AI Status: [AI is currently processing tasks]');
        } else if (message.startsWith('messageAI:')) {
            const aiName = message.split(':')[1];
            const aiMessage = message.split(':')[2];
            if (aiName === 'CEO') {
                interactWithGPT4(aiMessage, {session: manageGPT4Session()}).then(response => {
                    ws.send(`Message to CEO GPT-4: ${response}`);
                }).catch(err => {
                    logError('Error sending message to CEO GPT-4:', err);
                    ws.send('Error processing your message to CEO GPT-4.');
                });
            } else {
                // Handle other AI instances
                spinUpGPT3_5Instance(aiMessage).then(response => {
                    ws.send(`Response from GPT-3.5: ${response}`);
                }).catch(err => {
                    logError('Error with GPT-3.5 instance:', err);
                    ws.send('Error processing your task.');
                });
            }
        } else {
            console.log('received: %s', message);
            // Existing message handling
        }
            retrieveContext(sessionId).then(context => {
                // Use context for processing message or updating it
                // Example: Update context with new message
                const updatedContext = `${context || ''}\n${message}`;
                storeContext(sessionId, updatedContext).catch(err => console.error('Error updating context:', err));
            }).catch(err => console.error('Error retrieving context:', err));
        }
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });

    ws.on('error', function error(err) {
        console.error('WebSocket error:', err);
    });
});
