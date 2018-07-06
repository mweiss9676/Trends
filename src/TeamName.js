import React from 'react';
import { connect } from 'react-redux';
import { setTeamName } from './Actions/game-actions';

class TeamName extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isTeamNameEntered: false,
            teamNameText: '', 
            allowSubmit: true,
            warningBox: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }    

    

    handleChange(event) {
    
        this.setState({
            teamNameText: event.target.value
        });

        let restrictedNames = this.props.takenNames.map(name => name.teamName.toUpperCase())

        let nameIsTaken = restrictedNames.includes(event.target.value.toUpperCase())

        if (nameIsTaken) {
            this.setState({
                warningBox: true
            })
            this.setState({
                allowSubmit: false
            });
        } else {
            this.setState({
                warningBox: false
            })
            this.setState({
                allowSubmit: true
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    
        if(this.state.allowSubmit) {
            this.props.onSetTeamName(this.state.teamNameText);

            this.setState({
                isTeamNameEntered: true
            })
        }
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
                            { this.state.warningBox && 
                                <div className="warningBox2">
                                    <h1 className="warningText">Too slow! {this.state.teamNameText} is already taken!</h1>
                                </div>    
                            }
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
    teamName: state.teamName,
    takenNames: state.takenNames
})

const mapActionsToProps = {
    onSetTeamName: setTeamName
}

export default connect(mapStateToProps, mapActionsToProps)(TeamName);
