import React from 'react';
import { connect } from 'react-redux';

import search from './images/search.png';

class Searchbar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentTerm: 'waffles'
        }
    }

    render(){
        return(
            <div>
                <input  autoFocus={ true } disabled={ !this.props.roundActive } type="text" className="searchbar" placeholder={ this.props.keyword }></input>
                <img id="searchIcon" src={ search } alt="search icon"/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    keyword: state.gameKeyword,
    roundActive: state.roundInfo.roundActive
});

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps)(Searchbar)