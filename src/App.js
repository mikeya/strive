import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import QuestionFlow from './pages/QuestionFlow';
import ReviewQuestions from './pages/ReviewQuestions';

import './App.css';


class App extends Component {
  render() {

    return (
        <Router>
            <div>
                <Route exact path="/" component={QuestionFlow}/>
                <Route exact path="/score" component={ReviewQuestions}/>
            </div>
        </Router>

    );
  }
}

export default App;
