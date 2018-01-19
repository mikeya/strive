import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './client';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Login from './pages/Login';
import QuestionFlow from './pages/QuestionFlow';
import GradeQuestions from './pages/GradeQuestions';

import './App.css';


export default () => (
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Route exact path="/" component={QuestionFlow}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/grade" component={GradeQuestions}/>
            </div>
        </Router>
    </ApolloProvider>
);


