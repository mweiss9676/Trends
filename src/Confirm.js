import React from 'react';
import { connect } from 'react-redux';

import { setLengthRounds, confirmSettings } from './Actions/game-actions';
import TeamName from './TeamName'

class Confirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: true
        }

        this.parseTime = this.parseTime.bind(this);
    }

    parseTime = time => {
        const result =  
            time.split(' ')
                .map(word => word.toLowerCase())
                .reduce((acc, current, index, array) => {
                    if (current === 'second' || current === 'seconds' || current === 'sec') {
                        return acc + ((array[index - 1]) * 1000)
                    } else if (current === 'minute' || current === 'min' || current === 'minutes') {
                        return acc + ((array[index - 1]) * 60000)
                    } else {
                        return acc + 0
                    }
                }, 0);
        return result;
    }

    render() {
        if (this.state.showForm === true) {
            return (
                <div className="setupInterior">
                    <h1 contentEditable="true">Topic Term: { this.props.gameKeyword }</h1>
                    <h1 contentEditable="true">Number of rounds: { this.props.numberRounds }</h1>
                    <h1 contentEditable="true">Length of rounds: { this.props.timePerRound }</h1>
                    <h1 contentEditable="true">Number of teams: { this.props.numberTeams }</h1>
                    <button onClick={ () => {
                        //parse the time here
                        const parsed = this.parseTime(this.props.timePerRound);
                        this.props.onSetLengthRounds(parsed);

                        this.setState({
                            showForm: false
                        });

                        this.props.confirmSettings()

                    } }>Looks good!</button>
                </div>
            )
        } else {
            return (
                <TeamName />
            )
        }
    }
}

const mapStateToProps = state => ({
    timer: state.timer,
    numberRounds: state.numberRounds,
    timePerRound: state.timePerRound,
    numberTeams: state.numberTeams,
    gameKeyword: state.gameKeyword,
    teamName: state.teamName
})

const mapActionsToProps = {
    onSetLengthRounds: setLengthRounds,
    confirmSettings: confirmSettings
}

export default connect(mapStateToProps, mapActionsToProps)(Confirm);
