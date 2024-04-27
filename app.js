const express = require('express')
const app = express()
const port = process.env.PORT || 3000


const server = require('http').createServer(app)
const WebSocket = require('ws')
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
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
