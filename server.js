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

  if (state.captain === null) {
    state.captain = socket;
  }

  socket.on('gameState', function() {
    socket.emit('captain', `${state.captain.id}`);
  })
})
