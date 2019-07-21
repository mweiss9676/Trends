import React from 'react';
import Searchbar from './Searchbar.js'
import { connect } from 'react-redux';

import Clock from './Clock';
import './styles/App.css';

class TopPart extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: 'GOOGLE TRENDS GAME'
        }
    }
    render(){
        return (
            <div className="topPart">
                { this.props.roundActive && <Clock /> }
                <h1 className="title"><span id="firstLetter">{this.state.title[0]}</span>{this.state.title.slice(1)}</h1>
                <Searchbar/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // takenNames: state.takenNames,
    teamNameColor: state.teamNameColor,
    roundActive: state.roundInfo.roundActive
})

export default connect(mapStateToProps)(TopPart);