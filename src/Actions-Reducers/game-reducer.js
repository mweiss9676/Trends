const CURRENT_TERM = 'CURRENT_TERM';
const LENGTH_ROUNDS = 'LENGTH_ROUNDS';
const NUMBER_ROUNDS = 'NUMBER_ROUNDS';
const TRENDS_INFO = 'TRENDS_INFO';
const TEAM_TOTALS = 'TEAM_TOTALS';
const NUMBER_TEAMS = 'NUMBER_TEAMS';



export function gameReducer(state = '', { type, payload }) {
    switch (type) {
        case CURRENT_TERM:
            return payload.term;
        
        case LENGTH_ROUNDS: 
            return payload.lengthRounds;
            
        case NUMBER_ROUNDS: 
            return payload.numberRounds;

        case TRENDS_INFO: 
            return payload.trendsInfo;

        case TEAM_TOTALS: 
            return payload.teamTotals;

        case NUMBER_TEAMS: 
            return payload.numberTeams;

        default: 
            return state;
    }
}

export function setNumberRounds(numberRounds){
    if(numberRounds !== undefined){
        return {
            type: NUMBER_ROUNDS,
            payload: {
                numberRounds: numberRounds
            }
        }
    } else {
        return null;
    }
}

export function setLengthRounds(lengthRounds) {
    if(lengthRounds !== undefined) {
        return {
            type: LENGTH_ROUNDS,
            payload: {
                lengthRounds: lengthRounds
            }
        }
    } else {
        return null;
    }
}

export function setNumberTeams(numberTeams){
    if (numberTeams !== undefined) {
        return {
            type: NUMBER_TEAMS,
            payload: {
                numberTeams: numberTeams
            }
        }
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