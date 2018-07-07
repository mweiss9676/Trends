import React from 'react';
import { connect } from 'react-redux';

class Round extends React.Component {
    constructor(props) {
        super(props) 
    }

    render() {
        return (
            <div className="round">
                <h1>Round { this.props.roundInfo.roundNumber }! Keyword: { this.props.roundInfo.keyword }</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    roundInfo: state.roundInfo
})

export default connect(mapStateToProps)(Round)