import React, { Component } from 'react';

export const AppContext = React.createContext();

export class AppProvider extends Component {
  state = {
    numberOfTeams : 0,
    numberOfRounds : 0,
    lengthOfRounds : 0,
    teamNames : []
  }
  render() {
    return (
      <AppContext.Provider value={{
          state: this.state, 
          setNumTeams : function() { this.setState({ numberOfTeams: 55})}
      }}>
        { this.props.children }
      </AppContext.Provider>
    )
  }
}