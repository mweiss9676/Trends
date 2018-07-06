import React from 'react';

export class TeamComponent extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }
    render(){
        return (
            <div className="teamComponent">
                <h1>{ this.props.name }</h1>
            </div>
        )
    }
}