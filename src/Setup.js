import React from 'react';
import { connect } from 'react-redux';
import { setNumberRounds, setLengthRounds, setNumberTeams, setTopicTerm } from './Actions/game-actions';
import Confirm from './Confirm';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions : [
                {   message: 'How many teams will be playing?',
                    type: 'number',
                    name: 'numberOfTeams',
                    placeholder: '...4'
                },
                {   message: 'How many rounds ya wanna do?',
                    type: 'number',
                    name: 'numberOfRounds',
                    placeholder: '...5'
                },
                {   message: 'And how long for each round?',
                    type: 'text',
                    name: 'lengthOfRounds',
                    placeholder: '...1 minute 30 seconds'
                },
                {   message: 'Alright, what\'s your team name?',
                    type: 'text',
                    name: 'teamName',
                    placeholder: '...Blue Baracudas'
                },
                {
                    message: 'Okie Doke, what is the our topic-term for this game?',
                    type: 'text',
                    name: 'topic',
                    placeholder: '...Pokemon'
                }
            ],
            page : 0,
            searchFieldText: '',
            warningText: null,
            warningVisible: false,
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
            case 'numberOfTeams':
                if (event.target.value < 2 || event.target.value > 10) {
                    this.setState({
                        warningText: 'The recommended number of teams is between 2 and 10',
                        warningVisible: true
                    })
                } else {
                    this.setState({
                        warningVisible: false
                    })
                }
                return this.props.onSetNumberTeams(event.target.value);

            case 'numberOfRounds':
                if (event.target.value < 1 || event.target.value > 30) {
                    this.setState({
                        warningText: 'The recommended number of rounds is at least 2 and at most 30',
                        warningVisible: true
                    })
                } else {
                    this.setState({
                        warningVisible: false
                    });
                }
                return this.props.onSetNumberRounds(event.target.value);

            case 'lengthOfRounds': 
                return this.props.onSetLengthRounds(event.target.value);

            case 'topic': 
                return this.props.onSetTopicTerm(event.target.value);

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
                                   placeholder={ this.state.questions[this.state.page].placeholder }
                                   value={ this.state.searchFieldText }
                                   onChange={ this.handleChange }>
                            </input>
                        </div>
                    </div>
                </form>
            )
        } else {
            return (
                <Confirm />
            )
        }
    }
}

const mapStateToProps = state => ({
    timer: state.timer,
    numberRounds: state.numberRounds,
    timePerRound: state.timePerRound,
    numberTeams: state.numberTeams,
    topicTerm: state.topicTerm
})

const mapActionsToProps = {
    onSetNumberRounds : setNumberRounds,
    onSetLengthRounds: setLengthRounds,
    onSetNumberTeams: setNumberTeams,
    onSetTopicTerm: setTopicTerm
}

export default connect(mapStateToProps, mapActionsToProps)(Form);
