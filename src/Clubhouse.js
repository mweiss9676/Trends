import React from 'react';
import Searchbar from './Searchbar.js'
import { connect } from 'react-redux';

import Clock from './Clock';
import { TeamComponent } from './Team.js';
import './App.css';


class Clubhouse extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <div className="clubhouse">
                { this.props.takenNames.map(team => {
                    if(team.name !== this.props.teamNameColor.name) {
                        return (
                            <TeamComponent name={ team.name } color={ team.color } />
                        )
                    }
                }) }
                <TeamComponent name={ this.props.teamNameColor.name } color={ this.props.teamNameColor.color } />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    takenNames: state.takenNames,
    teamNameColor: state.teamNameColor,
    roundActive: state.roundInfo.roundActive
})

export default connect(mapStateToProps)(Clubhouse);


