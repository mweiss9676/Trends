import React from 'react';
import search from './images/search.png';

export class Searchbar extends React.Component{
    render(){
        return(
            <div>
            <input type="text" className="searchbar"></input>
            <img id="searchIcon" src={ search } alt="search icon"/>
            </div>
        )
    }
}