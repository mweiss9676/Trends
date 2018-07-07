import React from 'react';
import { connect } from 'react-redux';

import { setLengthRounds, confirmSettings, setNumberRounds, setGameKeyword, setNumberTeams } from './Actions/game-actions';
import TeamName from './TeamName'

class Confirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: true
        }

        this.parseTime = this.parseTime.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(action, event) {
        switch(action) {
            case 'TIME': 
                return this.props.onSetLengthRounds(event.target.value)
            case 'KEYWORD':
                return this.props.onSetKeyword(event.target.value)
            case 'ROUNDS':
                return this.props.onSetNumberRounds(event.target.value)
            case 'TEAMS':
                return this.props.onSetNumberTeams(event.target.value)
            default: 
                return
        }
    }

    render() {
        if (this.state.showForm === true) {
            return (
                <div className="setupInterior">
                    <h1>Game Keyword:<input size='4' name='keyword' value={ this.props.gameKeyword } onChange={ event => { this.handleChange('KEYWORD', event)}}></input></h1>
                    <h1>Number of rounds:<input size='4' name='rounds' value={ this.props.numberRounds } onChange={ event => { this.handleChange('ROUNDS', event)}}></input></h1>
                    <h1>Time per round:<input size='4' name='time' value={ this.props.timePerRound } onChange={ event => { this.handleChange('TIME', event)}}></input></h1>
                    <h1>Number of teams:<input size='4' name='time' value={ this.props.numberTeams } onChange={ event => { this.handleChange('TEAMS', event)}}></input></h1>

                    <button onClick={ () => {

                        const minutesSeconds = /(minutes|minute|min|seconds|second|sec)/
                        
                        console.log(minutesSeconds.test(this.props.timePerRound))
                        console.log('timer per round is' + this.props.timePerRound)
                        if(minutesSeconds.test(this.props.timePerRound.toLowerCase())){

                            const parsed = this.parseTime(this.props.timePerRound);

                            this.props.onSetLengthRounds(parsed);

                            this.setState({
                                showForm: false
                            });

                            this.props.confirmSettings()
                        } else {
                            // return (
                            //     <div className="warningBox2">
                            //         <h1 className="warningText">Time per round should be like: '1 minute' or '35 sec'</h1>
                            //     </div>
                            // )
                            alert("time per round should be like: '1 minute' or '35 sec'")
                        }

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
    confirmSettings: confirmSettings, 
    onSetNumberRounds: setNumberRounds,
    onSetKeyword: setGameKeyword,
    onSetNumberTeams: setNumberTeams
}

export default connect(mapStateToProps, mapActionsToProps)(Confirm);
