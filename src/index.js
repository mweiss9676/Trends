import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import '../node_modules/materialize-css/dist/css/materialize.css';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { answerMiddleware, confirmGameSettingsMiddleware, captainMiddleware, teamNamesMiddleware } from './websocket';
import { setRoundReducer, lengthOfGameReducer, numberOfRoundsReducer, currentTermReducer, trendsInfoReducer, teamTotalsReducer, numberOfTeamsReducer, gameKeywordReducer, isCaptainReducer, hasCaptainReducer, isWaitingReducer } from './Reducers/game-reducer';
import { teamInfoReducer, otherTeamsInfoReducer } from './Reducers/team-reducer'


const allReducers = combineReducers({
    roundInfo: setRoundReducer,
    timePerRound: lengthOfGameReducer,
    numberRounds: numberOfRoundsReducer,
    currentTerm: currentTermReducer,
    trendsInfo: trendsInfoReducer,
    teamTotals: teamTotalsReducer,
    numberTeams: numberOfTeamsReducer, 
    gameKeyword: gameKeywordReducer,
    teamInfo: teamInfoReducer,
    isCaptain: isCaptainReducer, 
    hasCaptain: hasCaptainReducer,
    isWaiting: isWaitingReducer,
    otherTeamsInfo: otherTeamsInfoReducer
})

const defaultState = {

}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    allReducers,
    defaultState,
    composeEnhancers(applyMiddleware(confirmGameSettingsMiddleware, captainMiddleware, teamNamesMiddleware, answerMiddleware))
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
