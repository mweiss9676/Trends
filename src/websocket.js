import io from 'socket.io-client';
import { store } from './index';
import { setIsCaptain, setIsWaiting, setTakenName, setTeamNameColor, setRound } from './Actions/game-actions';

const socket = io('http://localhost:5000');

socket.on('isCaptain', function(bool) {
    store.dispatch(setIsCaptain(bool))
})

socket.on('waiting', function(bool) {
    store.dispatch(setIsWaiting(bool))
})

socket.on('startRound', function(term) {
    const roundInfo = JSON.parse(term);
    store.dispatch(setRound(roundInfo.keyword.word, roundInfo.roundNumber, true))
})

socket.on('takenNames', data => {
    const teamColor = JSON.parse(data)
    store.dispatch(setTakenName(teamColor[0][0], teamColor[1]))
})

socket.on('teamData', data => {
    const teamColor = JSON.parse(data)
    store.dispatch(setTeamNameColor(teamColor[0][0], teamColor[1]))
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

