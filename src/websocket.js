import io from 'socket.io-client';
import { store } from './index';
import { setIsCaptain, setIsWaiting, setTakenName, setTeamNameColor } from './Actions/game-actions';

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

socket.on('takenNames', function(name) {
    console.log(`the taken names are ${name}`);
    store.dispatch(setTakenName(JSON.parse(name)))
})

socket.on('teamAndColor', word => {
    const color = JSON.parse(word)
    store.dispatch(setTeamNameColor(color[0][0], color[1]))
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

export const teamNamesMiddleware = store => next => action => {
    if (action.type === 'TEAM_NAME') {
        socket.emit('teamName', action.payload)
    }

    next(action)
}

