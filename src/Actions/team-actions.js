export const TEAM_COLOR = 'TEAM_COLOR';
export const TEAM_NAME = 'TEAM_NAME';
export const TEAM_ROUND_SCORE = 'TEAM_ROUND_SCORE';
export const TEAM_TOTAL_SCORE = 'TEAM_TOTAL_SCORE';
export const TEAM_ANSWER = 'TEAM_ANSWER';
// export const TEAM_ID = 'TEAM_ID';

export const OTHER_TEAM_INFO = 'OTHER_TEAM_INFO';

// export function setTeamId(id) {
//     return {
//         type: TEAM_ID,
//         payload: {
//             id: id
//         }
//     }
// }

export function setTeamColor(color) {
    return {
        type: TEAM_COLOR,
        payload: {
            color: color,
        }
    }
}

export function setTeamName(name) {
    return {
        type: TEAM_NAME,
        payload: {
            teamName: name,
        }
    }
}

export function setTeamRoundScore(roundScore) {
    return {
        type: TEAM_ROUND_SCORE,
        payload: {
            roundScore: roundScore,
        }
    }
}

export function setTeamTotalScore(totalScore) {
    return {
        type: TEAM_TOTAL_SCORE,
        payload: {
            totalScore: totalScore,
        }
    }
}

export function setTeamAnswer(word, roundNumber) {
    return {
        type: TEAM_ANSWER,
        payload: {
            word: word,
            roundNumber: roundNumber
        }
    }
}


/************************************OTHER TEAMS **************************************/


export function setOtherTeamInfo(clientId, name, color, roundScore, totalScore, word, roundNumber) {
    console.log(`word is ${word}, and roundNumber is ${roundNumber}`)

    return {
        type: OTHER_TEAM_INFO,
        payload: {
            clientId: clientId,
            teamName: name,
            color: color,
            roundScore: roundScore,
            totalScore: totalScore,
            word: word,
            roundNumber: roundNumber
        }
    }
}




