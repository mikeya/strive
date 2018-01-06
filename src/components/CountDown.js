import React,{ Component } from 'react';
import moment from 'moment';

class CountDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            minutes: props.minutes,
            seconds: "00"
        }
    }

    componentDidMount(){
        let future = moment().add(this.props.minutes, 'minutes');
        let now = moment.now();
        let diff = future - now;

        let countdown = setInterval(() => {
            diff = moment(diff).subtract(1, 'seconds');
            let minutes = moment(diff).minutes();
            let seconds = moment(diff, 'ss').seconds() < 10 ?  "0" + moment(diff, 'ss').seconds() : moment(diff, 'ss').seconds();

            if(minutes === 0 && seconds === "00"){
                clearInterval(countdown);
                this.props.done();
            }
            this.setState({
                minutes,
                seconds
            })
        }, 1000)
    }

    render(){
        return (
            <div>
                {this.state.minutes}:{this.state.seconds}
            </div>
        )
    }
}

export default CountDown;