import React, {Component} from 'react'
import {London} from "../../stores/locationInfos";

export default class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            password2:''
        };
    };
    submittedForm = (e) => {
        e.preventDefault();
        this.setState({email:this.email.value, password:this.password.value, password2:this.password2.value });

        if(this.password.value.length < 8 ){
            return(console.log("password  too short"))
        }
        if(this.password.value !==  this.password2.value){
            return(console.log("password doesn't match"))
        }
        Accounts.createUser({email:this.email.value,password:this.password.value},error => {
            (error)? console.log(error): null;

        })
    };

    render(){
        return(

            <div>
                <p className="formTitle"> Register</p>
                <form onSubmit={this.submittedForm}>
                    <div className="form-group">
                        <label htmlFor="emailSignUp">Email address</label>
                        <input  onChange={(event) => this.setState({email:event.target.value})}  value={this.state.email} ref={(input) => {this.email = input}} type="email" className="form-control input" id="emailSignUp" aria-describedby="emailHelp" placeholder="Enter a valid email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="SingUpPassword">Password</label>
                        <input  onChange={(event) => this.setState({password:event.target.value})}  value={this.state.password} ref={(input) => {this.password = input}} type="password" className="form-control input" id="SingUpPassword" placeholder="Enter a strong password "/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="SingUpPasswordConf">Retype Password</label>
                        <input  onChange={(event) => this.setState({password2:event.target.value})}  value={this.state.password2} ref={(input) => {this.password2 = input}} type="password" className="form-control input" id="SingUpPasswordConf" placeholder="Retype password"/>
                    </div>

                    <button  type="submit" className="btn btn-link formBtn">SIGN UP</button>

                </form>
            </div>
        );

    }
}