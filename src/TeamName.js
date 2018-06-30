import React from 'react';
import { connect } from 'react-redux';
import { setTeamName } from './Actions/game-actions';

class TeamName extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isTeamNameEntered: false,
            teamNameText: '' 
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }    

    handleChange(event) {
        this.setState({
            teamNameText: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            isTeamNameEntered: true
        });
        this.props.onSetTeamName(this.state.teamNameText);
    }

    render() {
        if(this.state.isTeamNameEntered === false) {
            return (
                <form onSubmit={ this.handleSubmit }>
                    <div className="setup">
                        <div className="setupInterior">
                            <h1 className="question">What is your team name?</h1>
                            <input 
                                className="setupInput"
                                type="text" 
                                name="teamName"
                                placeholder="...Blue Baracudas"
                                value={ this.state.teamNameText }
                                onChange={ this.handleChange }
                                >
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
    teamName: state.teamName
})

const mapActionsToProps = {
    onSetTeamName: setTeamName
}

export default connect(mapStateToProps, mapActionsToProps)(TeamName);
