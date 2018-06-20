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
            searchFieldText: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.updatePage = this.updatePage.bind(this);
    }

    updatePage(event) {

        event.preventDefault();

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
                return this.props.onSetNumberRounds(event.target.value);
            case 'numberOfTeams':
                return this.props.onSetNumberTeams(event.target.value);
            case 'lengthOfRounds': 
                return this.props.onSetLengthRounds(event.target.value);
            // case 'teamName': 
            //     return this.props.onSetTeamName;
            default:
                return;

       }
    }

    render() {
        if(this.state.page < this.state.questions.length){
            return (
                <form onSubmit={ this.updatePage }>
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
            return null
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
