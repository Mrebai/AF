import React,{Component} from "react";
import Routes from './Routes'
import {withApollo} from 'react-apollo'
import {graphql} from 'react-apollo'
import {userQuery} from './api/queries'





import './css/styleSheet.css'
import gql from "graphql-tag";

var myclient = null;
class App extends Component {

    checkLogin = () => {
        if(this.props.data.loading){
            return false
        }
        if(this.props.data.error){
            return false
        }

        return true
    };

    render(){
    return(
        <div>
            {this.checkLogin()?  <Routes client={this.props.client}/> : <div>Loading</div>}

        </div>


    )
  }
};
export default graphql(userQuery)(withApollo(App)) ;
