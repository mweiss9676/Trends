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
    state.captain = id;
    console.log(state.captain)
  })


  socket.on('gameState', function(store) {
    // socket.emit('captain', `${state.captain.id}`);
    socket.emit('nerd', 'I am a nerd');
    
    const data = JSON.parse(store);

    gameState.timePerRound = data.timePerRound;
    gameState.numberRounds = data.numberRounds;
    gameState.currentTerm = data.currentTerm;
    gameState.numberTeams = data.numberTeams;

    console.log(gameState.numberRounds);
  })
})
