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
            warningBox: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }    

    

    handleChange(event) {
    
        console.log(this.regex)
        this.setState({
            teamNameText: event.target.value
        });

        this.props.otherTeamsInfo.map(team => console.log(`team is ${team}, and team.name is ${team.name}`))

        let restrictedNames = this.props.otherTeamsInfo.map(teamObj => teamObj.name.toUpperCase())

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
            this.props.dispatch({
                type: 'SEND_NAME',
                payload: this.state.teamNameText
            });

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
                                autoFocus={ true }
                                required={ true }
                                className="setupInput"
                                type="text" 
                                name="teamName"
                                placeholder="...Blue Baracudas"
                                pattern={"^(" + this.props.gameKeyword + "\\s\\S+|\\S+\\s" + this.props.gameKeyword + ")$"}
                                title={"Your Team Name must contain the game's keyword '" + this.props.gameKeyword + "'" }
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
    // takenNames: state.takenNames,
    otherTeamsInfo: state.otherTeamsInfo,
    gameKeyword: state.gameKeyword
})

export default connect(mapStateToProps)(TeamName);
