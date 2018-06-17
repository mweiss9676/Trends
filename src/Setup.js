import React from 'react';
import ReactDOM from 'react-dom';

export class Form extends React.Component {
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
            answer: ''
        }

        this.updateAnswer = this.updateAnswer.bind(this);
        this.updatePage = this.updatePage.bind(this);
    }
    updatePage(event) {
        event.preventDefault();

        this.setState(prevState => ({
            page: prevState.page + 1
        }))

        this.setState({  
            answer: ''
        })
    }

    updateAnswer(event) {
        this.setState({ 
            answer: event.target.value
        })
    }

    render() {
        if(this.state.page < this.state.questions.length){
            return (
                <form onSubmit={ this.updatePage }>
                    <div className="setup">
                        <div className="setupInterior">
                            <h1 className="question">{ this.state.questions[this.state.page].message }</h1>
                            <input type={ this.state.questions[this.state.page].type } name={ this.state.questions[this.state.page].name } value={ this.state.answer } onChange={ this.updateAnswer }></input>
                        </div>
                    </div>
                </form>
            )
        } else {
            return null
        }
    }
}
