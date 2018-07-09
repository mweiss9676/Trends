export const TEAM_COLOR = 'TEAM_COLOR';
export const TEAM_NAME = 'TEAM_NAME';
export const TEAM_ROUND_SCORE = 'TEAM_ROUND_SCORE';
export const TEAM_TOTAL_SCORE = 'TEAM_TOTAL_SCORE';
export const TEAM_ANSWER = 'TEAM_ANSWER';

export const OTHER_TEAM_INFO = 'OTHER_TEAM_INFO';


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


export function setOtherTeamInfo(socketID, name, color, roundScore, totalScore, word, roundNumber) {
    return {
        type: OTHER_TEAM_INFO,
        payload: {
            socketID: socketID,
            teamName: name,
            color: color,
            roundScore: roundScore,
            totalScore: totalScore,
            word: word,
            roundNumber: roundNumber
        }
    }
}




