var fetch = require('node-fetch');
var express = require('express');
var socket = require('socket.io');
const R = require('rambda');

var app = express();
var server = app.listen(5000, function() {
  console.log('listening to port 5000');
});

const io = socket(server);


const gameState = {
  timePerRound: null,
  numberRounds: null,
  currentTerm: null,
  numberTeams: -1,
  topicTerm: null,
  roundKeywords: [], 
  teams: [], 
  currentRound: null
}

function Team() {
  this.socketID = null,
  this.name = null,
  this.roundScore = null,
  this.totalScore = null,
  this.color = null,
  this.answer = {
    roundNumber: null,
    word: null
  }
}

const state = {
  captain: null
}

const colors = ['blue', 'orange', 'pink', 'green', 'brown', 'black', 'teal', 'yellow', 'purple', 'red']

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
    socket.emit('waiting', false);
  }



  socket.on('teamName', function(teamName) {

    const team = new Team();
    team.name = teamName;

    const color = colors.splice(Math.floor(Math.random() * colors.length), 1);
    team.color = color;

    team.socketID = socket.id;

    gameState.teams.push(team);
    socket.emit('teamData', JSON.stringify(team))
    io.emit('takenNames', JSON.stringify(team))

    if(gameState.teams.length == gameState.numberTeams) {
      runGame();
      const timer = setInterval(() => {
        gameState.timePerRound -= 1000;
        console.log(gameState.timePerRound);
      
        if(gameState.timePerRound <= 0) {

          io.emit('roundActive', false); //SEND END ROUND 

          clearInterval(timer);
        }
      }, 1000)
    }
  })

  socket.on('gameState', function(store) {
    
    const data = JSON.parse(store);

    gameState.timePerRound = data.timePerRound + 2000;
    gameState.numberRounds = data.numberRounds;
    gameState.currentTerm = data.gameKeyword;
    gameState.numberTeams = data.numberTeams;

    io.emit('gameKeyword', JSON.stringify(gameState.currentTerm))

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
      .then(() => io.emit('waiting', false))
      .catch(err => console.log(err));    
  })

  socket.on('answer', function(answer) {
    const team = gameState.teams.filter(team => team.socketID === socket.id);
    team.answer.roundNumber = gameState.currentRound;
    team.answer.word = answer;

    //fetch api data here
  })
})

const runGame = () => {

  gameState.currentRound = R.range(1, (gameState.numberRounds + 1)).shift();

  const round = {
    keyword: gameState.roundKeywords.pop(),
    roundNumber: gameState.currentRound
  }
  io.emit('startRound', JSON.stringify(round));
}






