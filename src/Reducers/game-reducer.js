import { RESTRICTED_NAME, CURRENT_TERM, LENGTH_ROUNDS, NUMBER_ROUNDS, TRENDS_INFO, TEAM_TOTALS, NUMBER_TEAMS, GAME_KEYWORD, IS_CAPTAIN, IS_WAITING, TEAM_NAME_COLOR } from '../Actions/game-actions';

export function lengthOfGameReducer(state = 60000, { type, payload }) {
    switch(type) {
        case LENGTH_ROUNDS: 
            return payload.lengthRounds;
        default: 
            return state
    }
}

export function currentTermReducer(state = [], { type, payload }) {
    switch(type) {
        case CURRENT_TERM: 
            return payload.currentTerm;
        default: 
            return state
    }
}

export function numberOfRoundsReducer(state = 5, { type, payload }) {
    switch(type) {
        case NUMBER_ROUNDS: 
            return payload.numberRounds;
        default: 
            return state
    }
}

export function trendsInfoReducer(state = [], { type, payload }) {
    switch(type) {
        case TRENDS_INFO: 
            return payload.trendsInfo;
        default: 
            return state
    }
}

export function teamTotalsReducer(state = [], { type, payload }) {
    switch(type) {
        case TEAM_TOTALS: 
            return payload.teamTotals;
        default: 
            return state
    }
}

export function numberOfTeamsReducer(state = 0, { type, payload }) {
    switch(type) {
        case NUMBER_TEAMS: 
            return payload.numberTeams;
        default: 
            return state
    }
}

export function gameKeywordReducer(state = '', { type, payload }) {
    switch(type) {
        case GAME_KEYWORD: 
            return payload.gameKeyword;
        default: 
            return state
    }
}

export function teamNameColorReducer(state = {}, { type, payload }) {
    switch(type) {
        case TEAM_NAME_COLOR: 
            return {
                name: payload.teamName, 
                color: payload.color
            }
        default: 
            return state
    }
}

export function isCaptainReducer(state = '', { type, payload }) {
    switch(type) {
        case IS_CAPTAIN: 
            return payload.isCaptain;
        default: 
            return state
    }
}

export function isWaitingReducer(state = '', { type, payload }) {
    switch(type) {
        case IS_WAITING: 
            return payload.isWaiting;
        default: 
            return state
    }
}


let initialState = [];
export function takenNamesReducer (state = initialState, { type, payload }) {
    switch(type) {
        case RESTRICTED_NAME:
            return [ ...state, { 
                name: payload.takenName,
                color: payload.takenColor
            } ]
        default: 
            return state
    }
}
