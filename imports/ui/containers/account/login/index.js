import React, {Component} from 'react'
import {Link,withRouter} from 'react-router-dom'

import SignUp from '../signUp/SignUp'
 class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loginEmail:'',
            loginPassword:'',
            loginErr: null,
        };
    };

    submittedLoginForm = (e) =>{
        e.preventDefault();
        Meteor.loginWithPassword(this.loginEmail.value, this.loginPassword.value, error =>{
            if(error){
                return (this.setState({loginErr:error.reason}))
            }

            this.setState({loginErr:null});
            this.props.client.resetStore();



           this.props.history.push('/');

        });
    };

    pushInfo = () => {
        if (Meteor.userId()){
            return Meteor.users.update(Meteor.userId(), {
                $set: {
                    information: "a thing"
                }
            });
        }
    };
    render(){
        return(
            <div className="container my-4">
                <div className="row">

                    <div className="col col-md-6">
                        <p className="formTitle"> SIGN IN</p>
                        <form onSubmit={this.submittedLoginForm}>
                            <div className="form-group">
                                <label htmlFor="emailLogin">Email address</label>
                                <input  onChange={(event) => this.setState({loginEmail:event.target.value})} value={this.state.loginEmail} ref={(input) => {this.loginEmail = input}} type="email" className="form-control input" id="emailLogin" aria-describedby="emailHelp" placeholder="Enter email"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordLogin">Password</label>
                                <input onChange={(event) => this.setState({loginPassword:event.target.value})}  value={this.state.loginPassword} ref={(input) => {this.loginPassword = input}} type="password" className="form-control input" id="passwordLogin" placeholder="Password"/>
                            </div>
                            {(this.state.loginErr)? <p className="loginError">{this.state.loginErr}</p> : null}

                            <button  type="submit" className="btn btn-link formBtn"> SIGN IN</button>
                            <Link className="float-right" to="/forgot_password"> Forgot Password <i className="fas fa-key"></i> </Link>
                        </form>
                    </div>
                    <div className="col col-md-6">
                        <SignUp/>

                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Login);