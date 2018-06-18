import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { gameReducer } from './Actions-Reducers/game-reducer';


const allReducers = combineReducers({
    game: gameReducer
})

const initialState = {
    CURRENT_TERM: ''
}

const store = createStore(
    allReducers,
    initialState
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
