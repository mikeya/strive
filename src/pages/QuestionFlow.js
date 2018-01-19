import React, { Component }from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import FormManager from '../components/FormManager';
import FormPage from '../components/FormManager/FormPage';

class QuestionFlow extends Component {
    constructor(props){
        super(props);
        this.state = {
            forms:[],
            loading: true
        }
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.data.loading){
            let userId = this.props.location.state && this.props.location.state.userId;
            if (!userId) {
                this.props.history.push('/login');
            }
            this.props.mutate({variables: {userId}})
                .then(response => {
                    let testId = response.data.newTest.id;
                    this.setState({
                        forms: nextProps.data.questions.map((question, i) => (
                            <FormPage
                                key={question.id}
                                questionId={question.id}
                                index={i + 1}
                                count={nextProps.data.questions.length}
                                prompt={question.prompt}
                                responseType={question.responseType}
                                time={{minutes: 3}}
                                testId={testId}
                            />)
                        ),
                        loading: false
                    })
                }).catch(error => console.error(error));
        }
    }

    render() {
        const { data: { loading }} = this.props;

        if (loading && this.state.loading) {
            return (<div><h1>Loading</h1></div>)
        }

        return (
            <FormManager>
                {this.state.forms}
            </FormManager>
        );
    }
};

export default compose(
    graphql(
        gql`
          query QuestionsQuery {
            questions {
              id
              prompt
              responseType
            }
          }
        `),
    graphql(
        gql`
          mutation newTest($userId: Int) {
            newTest(userId: $userId) {
              id
            }
          }
        `),

)(withRouter(QuestionFlow));