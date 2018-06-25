import { CURRENT_TERM, LENGTH_ROUNDS, NUMBER_ROUNDS, TRENDS_INFO, TEAM_TOTALS, NUMBER_TEAMS } from '../Actions/game-actions';

export function lengthOfGameReducer(state = 60000, { type, payload }) {
    switch(type) {
        case LENGTH_ROUNDS: 
            return payload.lengthRounds;
        default: 
            return state
    }
}

export function currentTermReducer(state = '', { type, payload }) {
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






// export default function userReducer(state = '', { type, payload }) {
//     switch (type) {
//       case UPDATE_USER: 
//         return payload.user;
//        default : 
//         return state
//     }
//   }

//   export function updateUser(newUser){
//     return {
//         type: UPDATE_USER,
//         payload: {
//             user: newUser
//         }
//     }
// }

// current word: string,
// timer: datetime,
// graph information: json,
// each teams total score: object of string: int,
// number of rounds: int