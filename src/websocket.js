import io from 'socket.io-client';
import { store } from './index';
import { setIsCaptain, setIsWaiting, setTakenName, setTeamNameColor, setRound, setGameKeyword } from './Actions/game-actions';

const socket = io('http://localhost:5000');

socket.on('isCaptain', bool => {
    store.dispatch(setIsCaptain(bool))
})

socket.on('waiting', bool => {
    store.dispatch(setIsWaiting(bool))
})

socket.on('startRound', term => {
    const roundInfo = JSON.parse(term);
    store.dispatch(setRound(roundInfo.keyword.word, roundInfo.roundNumber, true))
})

socket.on('roundActive', bool => {
    store.dispatch(setRound(null, null, bool))
})

socket.on('gameKeyword', keyword => {
    const gameKeyword = JSON.parse(keyword);
    store.dispatch(setGameKeyword(gameKeyword))
})

socket.on('takenNames', data => {
    const teamColor = JSON.parse(data)

    console.log(` teamcolor in takenNames is ${teamColor.name}`)

    store.dispatch(setTakenName(teamColor.color, teamColor.name))
})

socket.on('teamData', data => {
    const teamColor = JSON.parse(data)

    console.log(` teamcolor in teamData is ${teamColor}`)
    store.dispatch(setTeamNameColor(teamColor.color, teamColor.name))
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

