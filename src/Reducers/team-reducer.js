import { TEAM_COLOR, TEAM_NAME, TEAM_TOTAL_SCORE, TEAM_ROUND_SCORE, TEAM_ANSWER } from '../Actions/team-actions';
import { OTHER_TEAM_INFO } from '../Actions/team-actions';


export function teamInfoReducer(state = {}, { type, payload }) {
    switch(type) {
        case TEAM_NAME: 
            return {
                ...state,
                name: payload.teamName
            }
        case TEAM_COLOR: 
            return {
                ...state,
                color: payload.color
            }
        case TEAM_ROUND_SCORE: 
            return {
                ...state,
                roundScore: payload.roundScore
            }
        case TEAM_TOTAL_SCORE: 
            return {
                ...state,
                totalScore: payload.totalScore
            }
        case TEAM_ANSWER: 
            return {
                ...state,
                answer: {
                    word: payload.word,
                    roundNumber: payload.roundNumber
                }
            }
        default: 
            return state
    }
}


/* I am handed an object and asked to check my pile of objects to see if I have one that matches the id of the object I'm being handed
If I do I should update the other propery of the object to match the new one
Otherwise, if I don't have it I should add it to my collection */

let initialState = [];
export function otherTeamsInfoReducer(state = initialState, { type, payload }) {
    console.log(`the payload is ${payload} and the type is ${type}`)
    switch(type) {
        case OTHER_TEAM_INFO: 
            const team = state.find(teamObj => teamObj.socketID === payload.socketID);
            if(team === undefined) {
                return [
                     ...state,
                     {
                        socketID: payload.socketID,
                        name: payload.teamName,
                        color: payload.color,
                        roundScore: payload.roundScore,
                        totalScore: payload.totalScore,
                        answer: {
                            word: payload.word,
                            roundNumber: payload.roundNumber
                        }
                    } 
                 ]
            } else {
                state.map(
                    teamObj => {
                        console.log(`the teamObj is being mapped it is: ${teamObj.name}`)
                        return 
                        teamObj.socketID === payload.socketID ? 
                        [
                            Object.assign({}, teamObj, {
                                name: payload.teamName,
                                color: payload.color,
                                roundScore: payload.roundScore,
                                totalScore: payload.totalScore,
                                answer: {
                                    word: payload.word,
                                    roundNumber: payload.roundNumber
                                }
                            })
                        ] : [
                            teamObj
                        ]
                    }
                )
            }
                
        default: 
            return state
    }
}
