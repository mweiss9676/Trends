import React from 'react';
import { AppContext } from './Context';
import { connect } from 'react-redux';
import { setNumberRounds, setLengthRounds, setNumberTeams } from './Actions/game-actions';

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
            warningText: '',
            warningVisible: false
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
                if (event.target.value < 1 || event.target.value > 30) {
                    this.setState({
                        warningVisible: true,
                        warningText: 'The recommended number of rounds is at least 2 and at most 30'
                    })
                } else {
                    this.setState({
                        warningVisible: false
                    })
                    return this.props.onSetNumberRounds(event.target.value);
                }
            case 'numberOfTeams':
                if (event.target.value < 2 || event.target.value > 10) {
                    this.setState({
                        warningVisible: true,
                        warningText: 'The recommended number of teams is between 2 and 10'
                    })
                } else {
                    this.setState({
                        warningVisible: false
                    })
                }
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
                        {this.state.warningVisible && 
                            <div className="warningBox">
                                <h3 className="warningText">{ this.state.warningText }</h3>
                            </div>
                        }

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
