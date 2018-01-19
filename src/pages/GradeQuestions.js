import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class ReviewQuestions extends Component {
    constructor(props){
        super(props);
        this.tests = [];
        this.state = {
            tests: this.tests || []
        };
        this.filter = this.filter.bind(this);
        this.grade = this.grade.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.data.loading){
            this.tests = nextProps.data.tests;
            this.setState({
                tests: this.tests
            })
        }

    }

    filter(e) {
        let filterBy = e.target.value;
        if(filterBy !== "SHOW_ALL") {
            this.setState({
                tests: this.tests.filter((test) => {
                    if(filterBy === 'GRADED'){
                        return typeof test.grade === 'number';
                    }else{
                        return !test.grade && test.grade !== 0;
                    }

                })
            })
        } else {
            this.setState({
                tests: this.tests
            })
        }
    }

    grade(e, id){
        let grade = e.target.value;
        this.props.mutate({variables: { input: {grade, id}}})
            .then(response => {

            }).catch(e => {
                console.error(e);
        })
    }

    render(){
        const {
            loading
        } = this.props.data;
        if(loading){
            return (<div>Loading...</div>)
        }
        let tests = this.state.tests.map((test,i) => {
            let questionsAndAnswers = test.answers.map((answer, key) => {
                return [
                    <td key={"question_" + answer.question.id} className="pa3">
                        {key+1} : {answer.question.prompt}
                    </td>,
                    <td key={"answer_"+ answer.id} className="pa3">
                        <i>{answer.response}</i>
                    </td>
                ]
            });

           return (
               <tr className="stripe-dark" key={test.id}>
                   <td className="pa3">
                       {test.user.firstName} {test.user.lastName}
                   </td>
                   <td className="pa3">
                       {test.user.email}
                   </td>
                   {questionsAndAnswers}
                   <td className="pa3">
                       <input type="number" defaultValue={test.grade} onChange={(e) =>{this.grade(e, test.id)}}/>
                   </td>
               </tr>
           )
        });
        return (
            <div className="mw10 center">
                <select onChange={this.filter}>
                    <option value="SHOW_ALL">Show All</option>
                    <option value="GRADED">Graded</option>
                    <option value="NOT_GRADED">Not Graded</option>
                </select>
                <table className="f6 w-100 center" cellSpacing="0">
                    <thead>
                    <tr className="stripe-dark">
                        <th className="fw6 tl pa3 bg-white">Name</th>
                        <th className="fw6 tl pa3 bg-white">Email</th>
                        <th className="fw6 tl pa3 bg-white">Questions</th>
                        <th className="fw6 tl pa3 bg-white">Answers</th>
                        <th className="fw6 tl pa3 bg-white">Score</th>
                    </tr>
                    </thead>
                    <tbody className="lh-copy">
                        {tests}
                    </tbody>
                </table>
            </div>
        )


    }
}

export default compose(
    graphql(
        gql`
          query TestsQuery {
            tests {
                id
                grade
                user {
                    firstName
                    lastName
                    email
                }
                answers {
                    id
                    response
                    question {
                        id
                        prompt
                    }
                }
             }
          }
        `
    ),
    graphql(
        gql`
            mutation gradeTest($input: TestInput){
                gradeTest(input: $input){
                    id
                    grade
                }
            }
        `
    ),
)(ReviewQuestions);