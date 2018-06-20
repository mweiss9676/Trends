import React, { Component } from 'react';
// import { AppContext, AppProvider } from './Context';
import './App.css';
import { Clubhouse, TopPart } from './Clubhouse.js';
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
      // <AppProvider>
        <div className="app">
          <Form />
          <TopPart />
          {/* <AppContext.Consumer>
            {(context) => (
              <p className="test">{ context.state.numberOfTeams }</p>
            )}
          </AppContext.Consumer> */}
          <Clubhouse />
        </div>
      // </AppProvider>
    )
  }
}

export default App;
