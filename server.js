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