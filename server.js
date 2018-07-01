const fetch = require('node-fetch');
const express = require("express");
const server = require('http').createServer();
const io = require('socket.io')(server);
/*
one person will set up the game
there will be a socket connection made on the first person to connect
this person will input the length of rounds, the number of rounds, number of teams, and the keyword
there will be a boolean to prevent any other socket's input until the game is 'setup'
after the game is setup the server will ask for teamnames
once all teamnames are in the server will start the first round by starting the timer 
if the timer isn't running the client shouldn't accept input in the search box
after all answers are received/the timer ends the server should send a stop timer/round function and process the answers
*/

//what info does the server need to run the game?
//all team names and their associated scores per round and overall, as well as their guesses 
//the game's keyword
//the length of the rounds
//the number of rounds

let gameCaptain = null;
let teamInfo = null;
let keyword = null;
let gamePassCode = null;
let roundLength = null;
let numberRounds = null;
let isGameSetup = false;
let numberTeams = null;
let terms = [];
let totalConnections = 0;

function reset() {
  gameCaptain = null;
  teamInfo = null;
  keyword = null;
  gamePassCode = null;
  roundLength = null;
  numberRounds = null;
  isGameSetup = false;
  numberTeams = null;
  gameTerms = [];
  totalConnections = 0;
}

io.on('connection', function(socket) {

  if(gameCaptain === null) {
    gameCaptain = socket;
    socket.emit('isCaptain', true);
  }

  socket.on('connect', function() {
    totalConnections++;
  })

  socket.on('disconnect', function() {
    totalConnections--;
  })
  
  if (numberTeams === totalConnections){
    isGameSetup = true;
  } else if (numberTeams < totalConnections) {
    socket.terminate();
  }

  io.on('gameState', gameState => {
    roundLength = gameState.timePerRound;
    numberRounds = gameState.numberRounds;
    keyword = gameState.topicTerm;
    numberTeams = gameState.numberTeams;
  })


  if(isGameSetup) {

    if(keyword.includes(' ')) {
      keyword = keyword.replace(' ', '+');
        fetch(`https://api.datamuse.com/words?ml=${term}&max=5`)
          .then(terms => terms.json())
          .then(json => gameTerms.push(...json))
          .catch(err => console.log(err));
    } else {
        fetch(`https://api.datamuse.com/words?rel_trg=${term}&max=5`)
          .then(terms => terms.json())
          .then(json => gameTerms.push(...json))
          .then(io.emit(gameTerms[0]))
          .catch(err => console.log(err));
    }


  }


  
});


reset()
const port = 5000
io.listen(port)
console.log('Listening on port ' + port + '...')


























































// const serverPort = 5000;
// const http = require("http");
// const app = express();
// const server = http.createServer(app);
// const WebSocket = require("ws");
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (webSocketClient) => {
//     webSocketClient.send('{ "connection" : "ok"}');
//     webSocketClient.on('message', (message) => { wss.clients.forEach( client => { client.send(`{ "message" : ${message} }`) });
//     });
// });

// const broadcast = (data, ws) => {
//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN && client !== ws) {
//       client.send(JSON.stringify(data))
//     }
//   })
// }

// wss.on('connection', ws => {
//   ws.on('')
// })

// app.get('/api/:term', (req, res) => {
//   let term = req.params.term;

//   if(term.includes(' ')) {

//     term = term.replace(' ', '+');
//     fetch(`https://api.datamuse.com/words?ml=${term}&max=5`)
//     .then(terms => terms.json())
//     .then(json => res.send(json))
//     .catch(err => console.log(err));
    
//   } else {

//     fetch(`https://api.datamuse.com/words?rel_trg=${term}&max=5`)
//     .then(terms => terms.json())
//     .then(json => res.send(json))
//     .catch(err => console.log(err));
//   }
// })

// server.listen(serverPort, () => {console.log(`Websocket server started on port ` + serverPort) });


// //we could have a single user setup the game, entering in the length of rounds, number of rounds, and the keyword and then send the game state to this server. 
// //This server could then request each user input their team name
// //This server could then disseminate the game state to all connected users
// //That gamestate could be used to create identical games across all users
// //this server could then issue a command to begin round one and start a timer
// //when the timer ends the server could refuse any more answers (somehow)

