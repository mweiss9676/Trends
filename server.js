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
  topicTerm: null
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
  }

  socket.on('gameState', function(store) {
    
    const data = JSON.parse(store);

    gameState.timePerRound = data.timePerRound;
    gameState.numberRounds = data.numberRounds;
    gameState.currentTerm = data.currentTerm;
    gameState.numberTeams = data.numberTeams;

    console.log(`the timePerRound is ${gameState.timePerRound}`);
    console.log(`the numberRounds is ${gameState.numberRounds}`);
    console.log(`the numberTeams is ${gameState.numberTeams}`);
    console.log(`the currentTerm is ${gameState.currentTerm}`);
  })
})
