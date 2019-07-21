import React from 'react';
import { connect } from 'react-redux';

import TeamComponent from './Team.js';
import './styles/App.css';


class Clubhouse extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <div className="clubhouse">
                { 
                    this.props.otherTeamsInfo.map(team => {             
                        return (
                            <TeamComponent name={ team.name } color={ team.color } />
                        )
                    }) 
                }
                <TeamComponent name={ this.props.teamInfo.name } color={ this.props.teamInfo.color } />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    otherTeamsInfo: state.otherTeamsInfo,
    teamInfo: state.teamInfo,
    roundActive: state.roundInfo.roundActive
})

export default connect(mapStateToProps)(Clubhouse);


