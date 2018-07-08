import React from 'react';
import { connect } from 'react-redux';

class Clock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            timeLeft: this.props.time / 1000, 
        }

        // this.getTime = this.getTime.bind(this);
    }

    // getTime() {

    //     let result = '';
    //     let time = this.state.timeLeft

    //     while (time / 60 > 0) {
    //         time /= 60;
    //         result += time;
    //     }

    //     result += ' min';

    //     while (time > 0) {
    //         time %= 60;
    //     }

    //     result += (time + ' sec');
        
    //     return result;

    // }

    componentDidMount() {
        const time = setInterval(() => {

            this.setState( prevState => ({
                timeLeft: prevState.timeLeft - 1
            }))

            console.log(`inside updateTime the timeleft is ${this.state.parsedTime}`)

            if(this.state.timeLeft <= 0) {
                clearInterval(time);
                document.getElementById('searchForm').submit();
            }
        }, 1000);
    }

    render() {
        return(
            <div className="clock">
                <h1 className="time">{ this.state.timeLeft }</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    roundActive: state.roundInfo.roundActive,
    time: state.timePerRound
})

export default connect(mapStateToProps)(Clock);