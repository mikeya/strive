import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CountDown from '../CountDown';
import TextArea from '../Form/TextArea'

class FormPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            response: "",
            testId: props.testId,
            questionId: props.questionId
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event){
        if(event){
            event.preventDefault();
        }

        this.props.mutate({ variables: {input: this.state }})
            .then( response => {
                this.props.onSubmit();

            }).catch(e => {
            console.error(e);
        });
    }

    render(){
        const {
            index,
            count,
            prompt,
            responseType,
            time
        } = this.props;

        let input;
        if(responseType === 'textarea'){
            input = <TextArea/>;
        }

        return (
            <div>
                <header className="flex justify-between mv4 pb2 bb b--moon-gray">
                    <div>
                        Question <b>{index}</b> of <b>{count}</b>
                    </div>
                    <div>
                        <CountDown
                            time={time}
                            done={this.handleSubmit}/>
                    </div>
                </header>
                <div className="mv4">
                    {prompt}
                </div>
                {React.cloneElement(input, {
                    onChange: (e) => {
                        this.setState({
                            response: e.target.value
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
export default graphql(
    gql`
      mutation submitAnswer($input: AnswerInput) {
        submitAnswer(input: $input) {
          id
        }
      }
    `
)(FormPage);