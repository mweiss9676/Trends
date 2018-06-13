import React, { Component } from 'react';
import './App.css';
import { Clubhouse, TopPart } from './Clubhouse.js';
import { Searchbar } from './Searchbar.js';
import { Setup } from './Setup.js';

class App extends Component {
  render() {
    return (
    <div className="app">
        <Setup />
        <TopPart/>
        <Clubhouse />
    </div>
    )
  }
}

export default App;
