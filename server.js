const fetch = require('node-fetch');

const serverPort = 5000;
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

//what info does the server need to run the game?
//all team names 
//the game's keyword
//the length of the rounds
//the number of rounds
//

wss.on('connection', (webSocketClient) => {
    webSocketClient.send('{ "connection" : "ok"}');
    webSocketClient.on('message', (message) => { wss.clients.forEach( client => { client.send(`{ "message" : ${message} }`) });
    });
});

const broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data))
    }
  })
}

wss.on('connection', ws => {
  let index
})

app.get('/api/:term', (req, res) => {
  let term = req.params.term;

  if(term.includes(' ')) {

    term = term.replace(' ', '+');
    fetch(`https://api.datamuse.com/words?ml=${term}&max=5`)
    .then(terms => terms.json())
    .then(json => res.send(json))
    .catch(err => console.log(err));
    
  } else {

    fetch(`https://api.datamuse.com/words?rel_trg=${term}&max=5`)
    .then(terms => terms.json())
    .then(json => res.send(json))
    .catch(err => console.log(err));
  }
})

server.listen(serverPort, () => {console.log(`Websocket server started on port ` + serverPort) });


//we could have a single user setup the game, entering in the length of rounds, number of rounds, and the keyword and then send the game state to this server. 
//This server could then request each user input their team name
//This server could then disseminate the game state to all connected users
//That gamestate could be used to create identical games across all users
//this server could then issue a command to begin round one and start a timer
//when the timer ends the server could refuse any more answers (somehow)

