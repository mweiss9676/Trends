import React from 'react';
import { connect } from 'react-redux';

import search from './images/search.png';

class Searchbar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentAnswer: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.dispatch({
            type: 'SEND_ANSWER',
            payload: this.state.currentAnswer
        })    

        this.setState({
            currentAnswer: ''
        })
    }

    handleChange(event) {
        this.setState({
            currentAnswer: event.target.value
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={ this.handleSubmit } id="searchForm">
                    <input 
                        autoFocus={ true } 
                        disabled={ !this.props.roundActive } 
                        type="text" className="searchbar"
                        value={ this.state.currentAnswer }
                        onChange={ this.handleChange }
                        //still need to ignore case on these regex expressions for the vars
                        pattern={"^(" + this.props.keyword + "\\s\\S+|\\S+\\s" + this.props.keyword + ")$"}
                        title={"Your answer must include the game keyword: i.e. 'sticky " + this.props.keyword + "'..."}
                        placeholder={ this.props.keyword }>
                    </input>
                </form>
                <img id="searchIcon" src={ search } alt="search icon"/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    gameKeyword: state.gameKeyword,
    roundActive: state.roundInfo.roundActive,
    keyword: state.roundInfo.keyword
});

export default connect(mapStateToProps)(Searchbar)