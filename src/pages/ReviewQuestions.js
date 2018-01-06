import React, {Component} from 'react';

class ReviewQuestions extends Component {
    constructor(props){
        super(props);
        this.results = JSON.parse(localStorage.getItem('results'));
        this.state = {
            results: this.results || []
        };
        this.filter = this.filter.bind(this);
        this.grade = this.grade.bind(this);
    }

    filter(e) {
        if(e.target.value !== "Show All") {
            let filterBy = !!+e.target.value;
            this.setState({
                results: this.results.filter((result) => {
                    console.log(result)
                    return (result.graded === filterBy)
                })
            })
        }else{
            this.setState({
                results: this.results
            })
        }
    }

    grade(e, i){
        let score = e.target.value;
        let result = this.state.results[i];
        result.score = score;
        result.graded = true;
        localStorage.setItem('results', JSON.stringify(this.state.results));
    }

    render(){
        let resultComponents = this.state.results.map((result,i) => {
            let columns = Object.keys(result.questions).map(key => {
                return (
                    <div className="mv2">
                        {key} : {result.questions[key]}
                    </div>
                )
            });

           return (
               <tr className="stripe-dark" key={result.id}>
                   <td className="pa3">
                       {result.user.firstName} {result.user.lastName}
                   </td>
                   <td className="pa3">
                       {result.user.email}
                   </td>
                   <td className="pa3">
                    {columns}
                   </td>
                   <td className="pa3">
                       <input type="number" defaultValue={result.score} onChange={(e) =>{this.grade(e, i)}}/>
                   </td>
               </tr>
           )
        });
        return (
            <div className="mw10 center">
                <select onChange={this.filter}>
                    <option>Show All</option>
                    <option value="1">Graded</option>
                    <option value="0">Not Graded</option>
                </select>
                <table className="f6 w-100 center" cellspacing="0">
                    <thead>
                    <tr className="stripe-dark">
                        <th className="fw6 tl pa3 bg-white">Name</th>
                        <th className="fw6 tl pa3 bg-white">Email</th>
                        <th className="fw6 tl pa3 bg-white">Questions</th>
                        <th className="fw6 tl pa3 bg-white">Score</th>
                    </tr>
                    </thead>
                    <tbody className="lh-copy">

                    </tbody>
                {resultComponents}
                </table>
            </div>
        )


    }
}

export default ReviewQuestions;