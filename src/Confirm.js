import React from 'react';
import { connect } from 'react-redux';
import { setNumberRounds, setLengthRounds, setNumberTeams } from './Actions/game-actions';

class Confirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmed: false
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
        if (this.state.confirmed === false) {
            return (
                <div className="setupInterior">
                    <h1>Number of rounds: { this.props.numberRounds }</h1>
                    <h1>Length of rounds: { this.props.timePerRound }</h1>
                    <h1>Number of teams: { this.props.numberTeams }</h1>
                    <h1>Team name: { this.props.teamName }</h1>
                    <button onClick={ () => {
                        //parse the time here
                        const parsed = this.parseTime(this.props.timePerRound);
                        this.props.onSetLengthRounds(parsed);
                        this.setState({
                            confirmed: true
                        })
                    } }>Looks good!</button>
                </div>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = state => ({
    timer: state.timer,
    numberRounds: state.numberRounds,
    timePerRound: state.timePerRound,
    numberTeams: state.numberTeams
})

const mapActionsToProps = {
    onSetNumberRounds : setNumberRounds,
    onSetLengthRounds: setLengthRounds,
    onSetNumberTeams: setNumberTeams
}

export default connect(mapStateToProps, mapActionsToProps)(Confirm);
