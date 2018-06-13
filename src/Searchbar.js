import React from 'react';
import ReactDOM from 'react-dom';
import search from './images/search.png';

export class Searchbar extends React.Component{
    render(){
        return(
            <div>
            <input type="text" className="searchbar"></input>
            <img id="searchIcon" src={ search }/>
            </div>
        )
    }
}