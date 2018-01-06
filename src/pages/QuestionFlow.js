import React from 'react';
import FormManager from '../components/FormManager';
import FormPage from '../components/FormManager/FormPage';
import questions from '../data/questions';

export default () => {
    let user = localStorage.getItem("user");
    if(!user){
        window.location = '/login';
        return;
    }
    const forms = questions.map((question, i) => (
        <FormPage
            id={question.id}
            key={question.id}
            index={i+1}
            count={questions.length}
            text={question.text}
            input={question.input}
            time={question.time}
        />)
    );

    return (
        <FormManager>
            {forms}
        </FormManager>
    );
}