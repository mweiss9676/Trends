import React from 'react';
import { connect } from 'react-redux';

class TeamComponent extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }
    render(){
        return (
            <div className={["teamComponent", this.props.color].join(' ')}>
                <h1>{ this.props.name }</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

export default connect()(TeamComponent);