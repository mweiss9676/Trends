import React from 'react';
import ReactDOM from 'react-dom';
import { Searchbar } from './Searchbar.js'
import { TeamComponent } from './Team.js';
import './App.css';


export class Clubhouse extends React.Component {
    render(){
        return (
            <div className="clubhouse">
                <TeamComponent />
                <TeamComponent />
                <TeamComponent />
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


