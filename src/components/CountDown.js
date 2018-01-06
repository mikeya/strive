import React,{ Component } from 'react';
import moment from 'moment';

class CountDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            minutes: props.time.minutes,
            seconds: "00"
        };
        this.start = this.start.bind(this);
    }

    componentDidMount(){
        this.start(this.props.time);
    }

    componentWillReceiveProps(newProps){
        clearInterval(this.countdown);
        this.setState({
            minutes: newProps.time.minutes,
            seconds: "00"
        });
        this.start(newProps.time);
    }

    start(time){
        let future = moment().add(time.minutes, 'minutes');
        let now = moment.now();
        let diff = future - now;

        this.countdown = setInterval(() => {
            diff = moment(diff).subtract(1, 'seconds');
            let minutes = moment(diff).minutes();
            let seconds = moment(diff, 'ss').seconds() < 10 ?  "0" + moment(diff, 'ss').seconds() : moment(diff, 'ss').seconds();

            if(minutes === 0 && seconds === "00"){
                clearInterval(this.countdown);
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