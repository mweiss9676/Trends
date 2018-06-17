import React, { Component } from 'react';
import './App.css';
import { Clubhouse, TopPart } from './Clubhouse.js';
import { Searchbar } from './Searchbar.js';
import { Form } from './Setup.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage : null,
      loaded : false
    }
  }

  render() {
    return (
      <div className="app">
        <Form />
        <TopPart />
        <Clubhouse />
      </div>
    )
  }
}

export default App;
