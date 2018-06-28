// const express = require('express');
// const http = require('http');
// const path = require('path');
const fetch = require('node-fetch');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.Server(app);
// const io = socketIO(server);
// const port = process.env.PORT || 5000;

// app.set('port', (port));
// app.use('/public', express.static(__dirname + '/public'));


// // app.get('/api/words', (req, res) => {
// //   fetch('https://api.datamuse.com/words?rel_trg=cow&max=5')
// //   .then(res => res.json())
// //   .then(json => res.send(json))
// // })
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'))
//   .err(err => console.log(err))
// });

// app.get('/api/hello', (req, res) => {
//   res.send( [{ 'word': 'Hello From Express' }, { 'word': 'second' }] );
// });

// server.listen(5000, () => console.log(`Listening on port ${5000}`));

// io.on("connect", () => {
  
// })


//   // componentDidMount() {
//   //   fetch('https://api.datamuse.com/words?rel_trg=cow&max=5')
//   //     .then(res => res.json())
//   //     .then(data => this.setState({ response: data }))
//   //     .then(() => window.fuckingwork = this.state.response)
//   // }

  

//   // async componentDidMount(){
//   //   const result = await fetch('/api/words')
//   //   .then(() => this.setState({ response: result }))  
//   // };


const serverPort = 5000;
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");
const websocketServer = new WebSocket.Server({ server });

websocketServer.on('connection', (webSocketClient) => {
    webSocketClient.send('{ "connection" : "ok"}');
    webSocketClient.on('message', (message) => { websocketServer.clients.forEach( client => { client.send(`{ "message" : ${message} }`) });
    });
});

app.get('/api/:term', (req, res) => {
  const term = req.params.term;
  fetch(`https://api.datamuse.com/words?rel_trg=${term}&max=5`)
  .then(terms => terms.json())
  .then(json => res.send(json))
  .catch(err => console.log(err));
})

server.listen(serverPort, () => {console.log(`Websocket server started on port ` + serverPort) });

// const express = require('express');
// const fetch = require('node-fetch');

// const app = express();
// const port = process.env.PORT || 5000;
// var result = [];

// app.get('/api/words', (req, res) => {
//   fetch('https://api.datamuse.com/words?rel_trg=cow&max=5')
//   .then(res => res.json())
//   .then(json => res.send(json))
// })


// app.get('/api/hello', (req, res) => {
//   res.send( [{ 'word': 'Hello From Express' }, { 'word': 'second' }] );
// });



// app.listen(port, () => console.log(`Listening on port ${port}`));


  // componentDidMount() {
  //   fetch('https://api.datamuse.com/words?rel_trg=cow&max=5')
  //     .then(res => res.json())
  //     .then(data => this.setState({ response: data }))
  //     .then(() => window.fuckingwork = this.state.response)
  // }

  

  // async componentDidMount(){
  //   const result = await fetch('/api/words')
  //   .then(() => this.setState({ response: result }))  
  // };