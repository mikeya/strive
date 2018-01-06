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
                    <div>
                        {key} : {result.questions[key]}
                    </div>
                )
            });

           return (
               <div className='flex w-100 justify-between mv3' key={result.id}>
                   {columns}
                   <div>
                       <input type="number" defaultValue={result.score} onChange={(e) =>{this.grade(e, i)}}/>
                   </div>
               </div>
           )
        });
        return (
            <div className="mw10 center">
                <select onChange={this.filter}>
                    <option>Show All</option>
                    <option value="1">Graded</option>
                    <option value="0">Not Graded</option>
                </select>
                {resultComponents}
            </div>
        )


    }
}

export default ReviewQuestions;