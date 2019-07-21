import React from 'react';
import { connect } from 'react-redux';
import { setNumberRounds, setLengthRounds, setNumberTeams, setTopicTerm } from './Actions/game-actions';

import Form from './Form'

class Setup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showButton: true
        }

        this.hideSetup = this.hideSetup.bind(this);
    }

    hideSetup = () => {
        this.props.dispatch({
            type: 'SET_CAPTAIN'
        });
    }
    

    render() {
        if (!this.props.hasCaptain){
            return(
                <div className="setupFirst">
                    <div className="setupInterior">
                        <h1 className="question">I'm the captain now...</h1>
                        <button 
                            className="waves-effect waves-light btn"
                            onClick={ this.hideSetup }>Setup</button>
                    </div>
                </div>
            )
        } else if (this.props.isWaiting === true) {
            return(
                <div className="setupFirst">
                    <div className="setupInterior">
                        <h1>Waiting...</h1>
                    </div>
                </div>
            )
        } else {
            return (<Form />)
        }
    }
}

const mapStateToProps = state => ({
    isCaptain: state.isCaptain, 
    isWaiting: state.isWaiting
})


export default connect(mapStateToProps)(Setup);
