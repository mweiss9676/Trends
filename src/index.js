import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { otherMiddleware } from './websocket';
import { lengthOfGameReducer, numberOfRoundsReducer, currentTermReducer, trendsInfoReducer, teamTotalsReducer, numberOfTeamsReducer, topicTermReducer, teamNameReducer } from './Reducers/game-reducer';

export const socket = openSocket('http://localhost:5000');

const allReducers = combineReducers({
    timePerRound: lengthOfGameReducer,
    numberRounds: numberOfRoundsReducer,
    currentTerm: currentTermReducer,
    trendsInfo: trendsInfoReducer,
    teamTotals: teamTotalsReducer,
    numberTeams: numberOfTeamsReducer, 
    topicTerm: topicTermReducer,
    teamName: teamNameReducer
})

const socketMiddleware = store => next => action => {
    next(action);
    socket.emit('gameState', JSON.stringify(store.getState()));
    console.log(JSON.stringify(store.getState()));
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    allReducers,
    composeEnhancers(applyMiddleware(socketMiddleware, otherMiddleware))
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
