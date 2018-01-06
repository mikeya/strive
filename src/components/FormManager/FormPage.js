import React, { Component } from 'react';
import CountDown from '../CountDown';

class FormPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event){
        if(event){
            event.preventDefault();
        }

        if(typeof this.props.onSubmit === 'function'){
            this.props.onSubmit({[this.props.id] : this.state.value})
        }
    }

    render(){
        const {
            index,
            count,
            text,
            input,
            time
        } = this.props;

        return (
            <div>
                <header className="flex justify-between mv4 pb2 bb b--moon-gray">
                    <div>
                        Question <b>{index}</b> of <b>{count}</b>
                    </div>
                    <div>
                        <CountDown
                            minutes={time.minutes}
                            done={this.handleSubmit}/>
                    </div>
                </header>
                <div className="mv4">
                    {text}
                </div>
                {React.cloneElement(input, {
                    onChange: (e) => {
                        this.setState({
                            value: e.target.value
                        })
                    }
                })}
                <button className="mv4 f6 link dim ph3 pv2 mb2 db center white bg-dark-blue" onClick={this.handleSubmit}>
                    {index === count ? "Submit" : "Next"}
                </button>
            </div>
        )
    }
}

export default FormPage;