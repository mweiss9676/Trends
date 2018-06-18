const CURRENT_TERM = '';
const LENGTH_ROUNDS = 60000;
const NUMBER_ROUNDS = 5;
const TRENDS_INFO = '';
const TEAM_TOTALS = [];

export function gameReducer(state = '', { type, payload }) {
    switch (type) {
        case CURRENT_TERM:
            return payload.term;
        
        case LENGTH_ROUNDS: 
            return payload.timer;
            
        case NUMBER_ROUNDS: 
            return payload;

        case TRENDS_INFO: 
            return payload.trendsInfo;

        case TEAM_TOTALS: 
            return payload.teamTotals;

        default: 
            return state
    }
}

export function setNumberRounds(numberRounds){
    return {
        type: NUMBER_ROUNDS,
        payload: numberRounds
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