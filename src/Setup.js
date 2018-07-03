import React from 'react';
import { connect } from 'react-redux';
import { setNumberRounds, setLengthRounds, setNumberTeams, setTopicTerm } from './Actions/game-actions';

import Form from './Form'

class Setup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
            waiting: false
        }

        this.hideSetup = this.hideSetup.bind(this);
    }

    hideSetup = () => {

        this.props.dispatch({
            type: 'SET_CAPTAIN',
        });
        this.setState({
            showForm: true
        })
    }
    

    render() {
        if (this.state.showForm === false){
            return(
                <div className="setupFirst">
                    <div className="setupInterior">
                        <h1 className="question">I'm the captain now...</h1>
                        <button 
                            onClick={ this.hideSetup }>Setup</button>
                    </div>
                </div>
            )
        } else if (this.state.waiting === true) {
            return (
                <div className="setupFirst">
                    <div className="setupInterior">
                        <h1>waiting...</h1>
                    </div>
                </div>
            )
        } else {
            return <Form />
        }
    }
}

const mapStateToProps = state => ({
    timer: state.timer,
    numberRounds: state.numberRounds,
    timePerRound: state.timePerRound,
    numberTeams: state.numberTeams,
    topicTerm: state.topicTerm
})

export default connect(mapStateToProps)(Setup);
