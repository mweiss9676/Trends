export const CURRENT_TERM = 'CURRENT_TERM';
export const LENGTH_ROUNDS = 'LENGTH_ROUNDS';
export const NUMBER_ROUNDS = 'NUMBER_ROUNDS';
export const TRENDS_INFO = 'TRENDS_INFO';
export const TEAM_TOTALS = 'TEAM_TOTALS';
export const NUMBER_TEAMS = 'NUMBER_TEAMS';
export const TOPIC_TERM = 'TOPIC_TERM';
export const TEAM_NAME = 'TEAM_NAME';
export const IS_CAPTAIN = 'IS_CAPTAIN';
export const IS_WAITING = 'IS_WAITING';
export const CONFIRM_SETTINGS = 'CONFIRM_SETTINGS';


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

export function setTopicTerm(topicTerm) {
    if (topicTerm !== undefined) {
        return {
            type: TOPIC_TERM,
            payload: {
                topicTerm: topicTerm
            }
        }
    }
}

export function setTeamName(teamName){
    if(teamName !== undefined) {
        return {
            type: TEAM_NAME,
            payload: {
                teamName: teamName
            }
        }
    }
}


export function setCurrentTerm(currentTerm){
    if(currentTerm !== undefined) {
        return {
            type: CURRENT_TERM,
            payload: {
                currentTerm: currentTerm
            }
        }
    }
}

export function setIsCaptain(isCaptain){
    if(isCaptain !== undefined) {
        return {
            type: IS_CAPTAIN,
            payload: {
                isCaptain: isCaptain
            }
        }
    }
}

export function setIsWaiting(isWaiting) {
    if(isWaiting !== undefined){
        return {
            type: IS_WAITING,
            payload: {
                isWaiting: isWaiting
            }
        }
    }
}

export function confirmSettings(store) {
    return {
        type: CONFIRM_SETTINGS,
        payload: {
            store: store
        }
    }
}
