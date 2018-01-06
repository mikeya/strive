import React, {Component} from 'react';
import SuccessPage from './SuccessPage';
import CountDown from '../CountDown';

class FormManager extends Component {
    constructor(){
        super();
        this.state = {
            step: 0,
            data: {},
        };

        this.time = {
            minutes: 0
        };

        this.saveResult = this.saveResult.bind(this);
    }

    nextStep(data){
        this.time = {
            minutes: 0
        };
        this.setState({
            step: this.state.step + 1,
            data: Object.assign({}, this.state.data, data)
        })
    }

    saveResult() {
        let results = JSON.parse(localStorage.getItem('results'));
        let user = JSON.parse(localStorage.getItem("user"));
        let result =  {user, id: Math.random().toString(36).substr(2, 9), graded: false, score: null, questions: this.state.data};
        if(results === null){
            results = [result];
        }else {
            results.push(result);
        }

        localStorage.setItem('results', JSON.stringify(results));
    }

    render(){
        const childrenWithProps = React.Children.map(this.props.children,
            child  => {
                if(this.state.step < child.props.index){
                    this.time.minutes = this.time.minutes += child.props.time.minutes
                }
                return React.cloneElement(child, {
                    onSubmit: (data) => {
                        this.nextStep(data);
                    },
                    data: this.state.data
                })
            }
        );

        if(this.state.step < childrenWithProps.length){
            return (
                <div className="mw8 center">
                    <div>
                        Total time remaining:
                        <CountDown
                            time={this.time}
                            done={this.handleSubmit}/>
                    </div>

                    {childrenWithProps[this.state.step]}
                </div>
            )
        }else {
            this.saveResult();
            return (
                <SuccessPage/>
            )
        }
    }
}

export default FormManager;