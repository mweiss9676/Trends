import React, { Component } from 'react';
import './App.css';
import Clubhouse, { TopPart } from './Clubhouse.js';
import Form from './Form';
import Setup from './Setup';


class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
        <div className="app">
          <Setup />
          <TopPart />
          <Clubhouse />
        </div>
    )
  }
}

export default App;
