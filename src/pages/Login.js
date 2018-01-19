import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:"",
            lastName: "",
            email:""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        this.props.mutate({ variables: {input: this.state }})
            .then( response => {
                this.props.history.push({
                    pathname: '/',
                    state: { userId: response.data.addUser.id }
                })

            }).catch(e => {
                console.error(e);
        });
    };

    render(){
        return (
            <div className="mw8 mv3 center">
                <form className="measure center" onSubmit={this.onSubmit}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                        <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email">First Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="firstName"  id="firstName" onChange={this.onChange} value={this.state.firstName}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Last Name</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="lastName"  id="lastName" onChange={this.onChange} value={this.state.lastName}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email" onChange={this.onChange} value={this.state.email}/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up"/>
                    </div>
                </form>
            </div>

        )
    }
}

export default graphql(
    gql`
      mutation addUser($input: UserInput) {
        addUser(input: $input) {
          id
          firstName
          lastName
          email
        }
      }
    `
)(withRouter(Login));