import React, {Component} from 'react';
import SuccessPage from './SuccessPage';
import CountDown from '../CountDown';

class FormManager extends Component {
    constructor(){
        super();
        this.state = {
            step: 0,
            data: {}
        };
        this.totalCount = {
            minutes: 0
        };

        this.saveResult = this.saveResult.bind(this);
    }

    nextStep(data){
        this.setState({
            step: this.state.step + 1,
            data: Object.assign({}, this.state.data, data)
        })
    }

    saveResult() {
        let results = JSON.parse(localStorage.getItem('results'));
        let result =  {id: Math.random().toString(36).substr(2, 9), userId:1, graded: false, score: null, questions: this.state.data};
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
                this.totalCount.minutes += child.props.time.minutes;
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
                            minutes={this.totalCount.minutes}
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