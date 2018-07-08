import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { confirmGameSettingsMiddleware, captainMiddleware, teamNamesMiddleware } from './websocket';
import { setAnswerReducer, setRoundReducer, takenNamesReducer, lengthOfGameReducer, numberOfRoundsReducer, currentTermReducer, trendsInfoReducer, teamTotalsReducer, numberOfTeamsReducer, gameKeywordReducer, isCaptainReducer, isWaitingReducer, teamNameColorReducer } from './Reducers/game-reducer';


const allReducers = combineReducers({
    roundInfo: setRoundReducer,
    timePerRound: lengthOfGameReducer,
    numberRounds: numberOfRoundsReducer,
    currentTerm: currentTermReducer,
    trendsInfo: trendsInfoReducer,
    teamTotals: teamTotalsReducer,
    numberTeams: numberOfTeamsReducer, 
    gameKeyword: gameKeywordReducer,
    teamNameColor: teamNameColorReducer,
    isCaptain: isCaptainReducer, 
    isWaiting: isWaitingReducer,
    takenNames: takenNamesReducer,
    answer: setAnswerReducer
})

const defaultState = {
    roundInfo: {
        roundActive: false
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    allReducers,
    defaultState,
    composeEnhancers(applyMiddleware(confirmGameSettingsMiddleware, captainMiddleware, teamNamesMiddleware))
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
