import React from 'react';
import Searchbar from './Searchbar.js'
import { TeamComponent } from './Team.js';
import { connect } from 'react-redux';
import './App.css';


class Clubhouse extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <div className="clubhouse">
                { this.props.takenNames.map(team => {
                    if(team.teamName !== this.props.teamNameColor.name) {
                        return (
                            <TeamComponent name={ team.teamName } color={ this.props.teamNameColor.color } />
                        )
                    }
                }) }
                <TeamComponent name={ this.props.teamNameColor.name } color={ this.props.teamNameColor.color } />
            </div>
        )
    }
}

export class TopPart extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: 'GOOGLE TRENDS GAME'
        }
    }
    render(){
        return (
            <div className="topPart">
                <h1 className="title"><span id="firstLetter">{this.state.title[0]}</span>{this.state.title.slice(1)}</h1>
                <Searchbar/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    takenNames: state.takenNames,
    teamNameColor: state.teamNameColor
})

export default connect(mapStateToProps)(Clubhouse);


