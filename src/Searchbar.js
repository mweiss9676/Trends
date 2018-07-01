import React from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

import search from './images/search.png';

class Searchbar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            socket: openSocket('http://localhost:5000'),
            currentTerm: 'waffles'
        }

        this.state.socket.on('term', term => {
            this.setState({
                currentTerm: term
            })
        })
    }

    render(){
        return(
            <div>
                <input type="text" className="searchbar" placeholder={ this.state.currentTerm }></input>
                <img id="searchIcon" src={ search } alt="search icon"/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentTerm: state.currentTerm
});

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps)(Searchbar)