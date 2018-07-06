var fetch = require('node-fetch');
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(5000, function() {
  console.log('listening to port 5000');
});

const io = socket(server);


const gameState = {
  timePerRound: null,
  numberRounds: null,
  currentTerm: null,
  numberTeams: null,
  topicTerm: null,
  roundKeywords: [], 
  teams: []
}

const state = {
  captain: null
}

io.on('connection', function(socket){

  console.log(`${socket.id} connected`)

  socket.on('setCaptain', id => {
    if(state.captain === null) {
      state.captain = id;
      console.log(`captain is socket.id: ${state.captain}`);

      socket.broadcast.emit('waiting', true);
      socket.broadcast.emit('isCaptain', false)
      socket.emit('isCaptain', true);
    }
  }) 

  if (state.captain !== null && socket.id !== state.captain) {
    socket.emit('isCaptain', false);
    socket.emit('waiting', true);
  } else if (state.captain === socket.id) {
    socket.emit('isCaptain', true);
  }

  socket.on('teamName', function(teamName) {
    gameState.teams.push(teamName);
    io.emit('takenNames', JSON.stringify(teamName))
    console.log(` this is what is in teamName: ${JSON.stringify(teamName)}`)
  })

  socket.on('gameState', function(store) {
    
    const data = JSON.parse(store);

    gameState.timePerRound = data.timePerRound;
    gameState.numberRounds = data.numberRounds;
    gameState.currentTerm = data.gameKeyword;
    gameState.numberTeams = data.numberTeams;


    let term = gameState.currentTerm;
    let datamuseURL;

    if(term.includes(' ')) {
      term = term.replace(' ', '+');
      datamuseURL = `https://api.datamuse.com/words?ml=${term}&max=${gameState.numberRounds}`;
    } else {
      datamuseURL = `https://api.datamuse.com/words?rel_trg=${term}&max=${gameState.numberRounds}`;
    }

    fetch(datamuseURL)
      .then(terms => terms.json())
      .then(words => gameState.roundKeywords.push(...words))
      .then(() => console.log(gameState.roundKeywords))
      .then(() => runGame())
      .catch(err => console.log(err));    
  })
})

const runGame = () => {
  io.emit('startRound', gameState.roundKeywords.pop());
}
