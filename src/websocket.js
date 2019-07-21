import io from 'socket.io-client';
import { store } from './index';
import { setIsCaptain, setHasCaptain, setIsWaiting, setTakenName, setRound, setGameKeyword, setLengthRounds } from './Actions/game-actions';
import { setTeamId, setTeamColor, setTeamName, setTeamAnswer, setTeamRoundScore, setTeamTotalScore } from './Actions/team-actions';
import { setOtherTeamInfo } from './Actions/team-actions';

const socket = io();
const client = {
    id: null
}

socket.on('id', id => {
    console.log(`my unique id is ${id}`);
    client.id = id;
})

socket.on('disconnect', function (reason){
    alert(`this piece of shit is failing because ${reason}`)
    setTimeout(() => {
        socket.emit('whatever', client.id)
    }, 2000)
})

socket.on('isCaptain', bool => {
    store.dispatch(setIsCaptain(bool))
})

socket.on('hasCaptain', bool => {
    store.dispatch(setHasCaptain(bool))
})

socket.on('waiting', bool => {
    store.dispatch(setIsWaiting(bool))
})

socket.on('startRound', term => {
    const roundInfo = JSON.parse(term);
    store.dispatch(setRound(roundInfo.keyword.word, roundInfo.roundNumber, true));
    console.log(`timePerRound here is ${roundInfo.timePerRound}`)
    store.dispatch(setLengthRounds(roundInfo.timePerRound));
})

socket.on('roundActive', bool => {
    store.dispatch(setRound(null, null, bool))
})

socket.on('gameKeyword', keyword => {
    const gameKeyword = JSON.parse(keyword);
    store.dispatch(setGameKeyword(gameKeyword))
})

socket.on('trendsResults', trendsInfo => {

    const info = JSON.parse(trendsInfo)
    // console.log(`the trends info is ${info.default.timelineData[info.default.timelineData.length - 1].value}`)

})

socket.on('otherTeamsInfo', data => {
    const teamData = JSON.parse(data)

    console.log(`otherTeamsInfo: clientId: ${teamData.clientId}, name: ${teamData.name}, color: ${teamData.color}, roundScore: ${teamData.roundScore }, totalScore: ${teamData.totalScore }, word: ${teamData.answer.word}, roundNumber: ${teamData.answer.roundNumber}`)

    //store.dispatch(setTakenName(teamData.color[0], teamData.name))
    store.dispatch(setOtherTeamInfo(
        teamData.clientId ? teamData.clientId : null,
        teamData.name ? teamData.name : null,
        teamData.color[0] ? teamData.color[0] : null,
        teamData.roundScore ? teamData.roundScore : null,
        teamData.totalScore ? teamData.totalScore : null,
        teamData.answer.word ? teamData.answer.word : null,
        teamData.answer.roundNumber ? teamData.answer.roundNumber : null,
    ));
})

socket.on('teamData', data => {
    const teamData = JSON.parse(data)

    console.log(` teamData looks like ${teamData}, teamData.color is ${teamData.color}, teamData.name is ${teamData.name} and teamData.answer.word is ${teamData.answer.word} and teamData.answer.roundNumber is ${teamData.answer.roundNumber}`)
    store.dispatch(setTeamColor(teamData.color[0] ? teamData.color[0]: null))
    store.dispatch(setTeamName(teamData.name ? teamData.name : null))
    store.dispatch(setTeamAnswer( (teamData.answer.word ? teamData.answer.word : null), (teamData.answer.roundNumber ? teamData.answer.roundNumber : null) ))
})

export const confirmGameSettingsMiddleware = store => next => action => {
    if(action.type === 'CONFIRM_SETTINGS') {
        socket.emit('gameState', JSON.stringify(store.getState()));
    }

    next(action);
}

export const captainMiddleware = store => next => action => {
    if(action.type === 'SET_CAPTAIN') {
        socket.emit('setCaptain', client.id)
    }

    next(action)
}

export const teamNamesMiddleware = store => next => action => {
    if (action.type === 'SEND_NAME') {
        socket.emit('teamName', action.payload)
    }

    next(action)
}

export const answerMiddleware = store => next => action => {
    if (action.type === 'SEND_ANSWER') {
        // console.log(`the answer we're sending over looks like: ${JSON.stringify(action.payload)}`)
        socket.emit('answer', action.payload)
    }

    next(action)
}


