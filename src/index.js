import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';

import { lengthOfGameReducer, numberOfRoundsReducer, termsReducer, trendsInfoReducer, teamTotalsReducer, numberOfTeamsReducer, topicTermReducer, teamNameReducer } from './Reducers/game-reducer';

const socket = openSocket('http://localhost:5000');

const allReducers = combineReducers({
    timePerRound: lengthOfGameReducer,
    numberRounds: numberOfRoundsReducer,
    terms: termsReducer,
    trendsInfo: trendsInfoReducer,
    teamTotals: teamTotalsReducer,
    numberTeams: numberOfTeamsReducer, 
    topicTerm: topicTermReducer,
    teamName: teamNameReducer
})

const socketMiddleware = store => next => action => {
    socket.emit('gameState', JSON.stringify(store.getState()));
    console.log(JSON.stringify(store.getState()));
    next(action);
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    allReducers,
    composeEnhancers(applyMiddleware(socketMiddleware))
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
