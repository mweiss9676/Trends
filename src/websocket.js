import io from 'socket.io-client';
import { store } from './index';
import { setIsCaptain, setIsWaiting } from './Actions/game-actions';

const socket = io('http://localhost:5000');

socket.on('isCaptain', function(bool) {
    store.dispatch(setIsCaptain(bool))
})

socket.on('waiting', function(bool) {
    store.dispatch(setIsWaiting(bool))
})

socket.on('startRound', function(term) {
    console.log(term);
    store.dispatch(setIsWaiting(false));
})

export const confirmGameSettingsMiddleware = store => next => action => {
    if(action.type === 'CONFIRM_SETTINGS') {
        socket.emit('gameState', JSON.stringify(store.getState()));
    }

    next(action);
}

export const captainMiddleware = store => next => action => {
    if(action.type === 'SET_CAPTAIN') {
        socket.emit('setCaptain', socket.id)
    }

    next(action)
}

