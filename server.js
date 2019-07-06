var fetch = require('node-fetch');
var express = require('express');
var socket = require('socket.io');
const R = require('rambda');
const googleTrends = require('google-trends-api');

// var app = express();
// var server = app.listen(3000);

// const io = socket(server);
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(5000);

const gameState = {
  timePerRound: null,
  numberRounds: null,
  currentTerm: null,
  numberTeams: -1,
  topicTerm: null,
  roundKeywords: [], 
  teams: [], 
  currentRound: null, 
}

function Team() {
  this.clientId = null,
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

  const team = new Team();
  team.clientId = guid();
  socket.emit('id', team.clientId)
  console.log(`I just sent an id of ${team.clientId} and the socket.id is ${socket.id}`)

  socket.on('whatever', reason => {
    // console.log(`reconnecting on the server side with incoming clientId = ${clientId} and server side team.clientId = ${team.clientId}`)
    console.log(`reconnect reason is ${reason}`)
  })

  socket.on('disconnect', function(word) {
    console.log(`${team.clientId} has disconnected and the reason is ${word}`);
  })

  socket.on('setCaptain', clientId => {
    if(state.captain === null) {
      state.captain = clientId;
      console.log(`captain is clientId: ${state.captain}`);

      socket.broadcast.emit('waiting', true);
      socket.broadcast.emit('isCaptain', false)
      socket.emit('isCaptain', true);
    }
  }) 


  if (state.captain !== null && team.clientId !== state.captain) {
    socket.emit('isCaptain', false);
    socket.emit('waiting', true);
  } else if (state.captain === team.clientId) {
    socket.emit('isCaptain', true);
    socket.emit('waiting', false);
  }




  socket.on('teamName', function(teamName) {

    // const team = gameState.teams.find(team => team.id === socket.id)
    team.name = teamName;

    const color = colors.splice(Math.floor(Math.random() * colors.length), 1);
    team.color = color;

    // team.socketID = socket.id;

    gameState.teams.push(team);
    emitUpdateTeamsInfo(socket, team);

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
    //console.log(`the gameState.timePerRound is ${gameState.timePerRound} and the data passed in is ${data.timePerRound}`)
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

    console.log(`the answer is ${answer}`)
    // const team = gameState.teams.find(team => team.socketID === socket.id)

    team.answer.roundNumber = gameState.currentRound;
    team.answer.word = answer;

    emitUpdateTeamsInfo(socket, team);

    googleTrends.interestOverTime({ keyword: answer })
    .then(data => socket.emit('trendsResults', data))
    .catch(err => console.log(err))
  })
})

const runGame = () => {

  gameState.currentRound = R.range(1, (gameState.numberRounds + 1)).shift();

  const round = {
    keyword: gameState.roundKeywords.pop(),
    roundNumber: gameState.currentRound,
    timePerRound: gameState.timePerRound
  }
  io.emit('startRound', JSON.stringify(round));
}

const emitUpdateTeamsInfo = (socket, team) => {
  socket.emit('teamData', JSON.stringify(team));
  socket.broadcast.emit('otherTeamsInfo', JSON.stringify(team));
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}







