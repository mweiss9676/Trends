import React, { Component } from 'react';
// import { AppContext, AppProvider } from './Context';
import './App.css';
import Clubhouse, { TopPart } from './Clubhouse.js';
import Form from './Setup.js';


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
