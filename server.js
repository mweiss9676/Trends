// const express = require('express');
// const http = require('http');
// const path = require('path');
// const fetch = require('node-fetch');
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

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;
var result = [];


app.get('/api/words', (req, res) => {
  fetch('https://api.datamuse.com/words?rel_trg=cow&max=5')
  .then(res => res.json())
  .then(json => res.send(json))
})


app.get('/api/hello', (req, res) => {
  res.send( [{ 'word': 'Hello From Express' }, { 'word': 'second' }] );
});



app.listen(port, () => console.log(`Listening on port ${port}`));


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