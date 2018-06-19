import React from 'react';
import { AppContext } from './Context';
import { connect } from 'react-redux';
import { setNumberRounds, setLengthRounds, setNumberTeams } from './Actions-Reducers/game-reducer';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions : [
                {   message: 'How many teams will be playing?',
                    type: 'number',
                    name: 'numberOfTeams'
                },
                {   message: 'How many rounds ya wanna do?',
                    type: 'number',
                    name: 'numberOfRounds'
                },
                {   message: 'And how long for each round?',
                    type: 'number',
                    name: 'lengthOfRounds'
                },
                {   message: 'Alright, what\'s your team name?',
                    type: 'text',
                    name: 'teamName'
                }
            ],
            page : 0,
            searchFieldText: '',
            numberOfTeams: 0,
            numberOfRounds: 0,
            lengthOfRounds: 0,
            teamName: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.onSetNumberRounds = this.onSetNumberRounds.bind(this);
        this.onSetLengthRounds = this.onSetLengthRounds.bind(this);
        this.onSetNumberTeams = this.onSetNumberTeams.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.updatePage(event);
        // this.onSetNumberRounds(event);
    }

    onSetNumberTeams(teamCount){
        this.props.onSetNumberTeams(teamCount);
    }

    onSetNumberRounds(rounds){
        this.props.onSetNumberRounds(rounds);
    }

    onSetLengthRounds(length){
        this.props.onSetLengthRounds(length);
    }

    updatePage(event) {
        this.setState(prevState => ({
            page: prevState.page + 1
        }))

        this.setState({
            searchFieldText: ''
        })
    }

    handleChange(event) {

        this.setState({
            searchFieldText: event.target.value
        })

        switch (event.target.name) {
            case 'numberOfRounds':
                return this.onSetNumberRounds(event.target.value);
            case 'numberOfTeams':
                return this.onSetNumberTeams(event.target.value);
            case 'lengthOfRounds': 
                return this.onSetLengthRounds(event.target.value);
            case 'teamName': 
                return this.onSetTeamName;
        default:
            return this.onSetNumberRounds(999);

       }
    }

    render() {
        if(this.state.page < this.state.questions.length){
            return (
                <form onSubmit={ this.onSubmitHandler }>
                    <div className="setup">
                        <div className="setupInterior">
                            <h1 className="question">{ this.state.questions[this.state.page].message }</h1>
                            <input className="setupInput"
                                   type={ this.state.questions[this.state.page].type }
                                   name={ this.state.questions[this.state.page].name }
                                   value={ this.state.searchFieldText }
                                   onChange={ this.handleChange }>
                            </input>
                        </div>
                    </div>
                </form>
            )
        } else {
            return this.onSetNumberRounds
        }
    }
}

const mapStateToProps = state => ({
    timer: state.timer,
    numberRounds: state.numberRounds,
})

const mapActionsToProps = {
    onSetNumberRounds : setNumberRounds,
    onSetLengthRounds: setLengthRounds,
    onSetNumberTeams: setNumberTeams
}

export default connect(mapStateToProps, mapActionsToProps)(Form);
