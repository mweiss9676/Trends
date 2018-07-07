import React, { Component } from 'react';
import './App.css';
import Clubhouse, { TopPart } from './Clubhouse.js';
import { connect } from 'react-redux';
import Form from './Form';
import Setup from './Setup';
import Round from './Round';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="app">
          <Setup />
          { this.props.roundActive && <Round />}
          <TopPart />
          <Clubhouse />
        </div>
    )
  }
}

const mapStateToProps = state => ({
  roundActive: state.roundInfo.roundActive
})

export default connect(mapStateToProps)(App);

