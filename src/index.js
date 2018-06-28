import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { lengthOfGameReducer, numberOfRoundsReducer, termsReducer, trendsInfoReducer, teamTotalsReducer, numberOfTeamsReducer, topicTerm } from './Reducers/game-reducer';


const allReducers = combineReducers({
    timePerRound: lengthOfGameReducer,
    numberRounds: numberOfRoundsReducer,
    terms: termsReducer,
    trendsInfo: trendsInfoReducer,
    teamTotals: teamTotalsReducer,
    numberTeams: numberOfTeamsReducer, 
    topicTerm: topicTerm
})

const store = createStore(
    allReducers,
    window.devToolsExtension && window.devToolsExtension()

);


ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
