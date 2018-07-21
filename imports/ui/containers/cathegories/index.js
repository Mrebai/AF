import React , {Component} from 'react';
import { graphql } from "react-apollo";
import {clothesQuery} from "../../api/queries"
import Element from './element'
 import {Switch,Route} from 'react-router-dom'
import Dashboard from "../dashboard";


class Cathegories extends Component {
    constructor(props) {
        super(props);
        this.state = {reset : 'main'};
    };

    reset = (a) => this.setState({reset:a,
        sortMethod : this.props.data.clothes});
    showNewArrival =(e) => {
       if(e === "new"){

           return this.setState({sortMethod: this.props.data.clothes.filter(item => item.newArrival)})
       }
        if(e === "special"){
            return this.setState({sortMethod: this.props.data.clothes.filter(item => item.oldPrice)})
        }
        if(e === "coming"){
            return this.setState({sortMethod: this.props.data.clothes.filter(item => item.comingSoon)})
        }
        if(e === "liked"){
           let arr = [];
           arr = arr.concat(arr,this.props.data.clothes);
           let sorted = arr.sort(function (a, b) {
               return a.likes - b.likes;
           });
            return this.setState({sortMethod:sorted})
        }
    };
    render(){
        if (this.props.data.loading) return <p>Loading...</p>;
        if (this.props.data.error) return <p>Error :(</p>;
        return(
            <div className='container'>
                {}
                <nav className="nav mt-4">
                    <button className="nav-link btn btn-link cathPick" onClick={()=>{this.showNewArrival('liked')}} >MOST LIKED</button>
                    <button className="nav-link btn btn-link cathPick" onClick={()=>{this.showNewArrival('new')}} >NEW ARRIVALS</button>
                    <button className="nav-link btn btn-link cathPick" onClick={()=>{this.showNewArrival('special') }}>SPECIAL OFFERS</button>
                    <button className="nav-link btn btn-link cathPick" onClick={()=>{this.showNewArrival('coming');}}>COMING SOON</button>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className='row1 col-lg-6 d-flex flex-column'>
                            <div className="row">
                                {console.log(this.props.match)}
                                <div className='col-lg-6 halfWidth'>
                                    {(this.state.sortMethod && this.state.sortMethod[0]._id)? <Route path={this.props.match.path} render={() =>  <Element item={this.state.sortMethod[0]} /> } />  :<Route path={this.props.match.path} render={() =>  <Element item={this.props.data.clothes[0]} /> } />  }
                                </div>
                                <div className='col-lg-6 halfWidth'>
                                    {(this.state.sortMethod && this.state.sortMethod[1])?<Route path={this.props.match.path} render={() =>  <Element item={this.state.sortMethod[1]} /> } /> :<Route path={this.props.match.path} render={() =>  <Element item={this.props.data.clothes[1]} /> } />  }
                                </div>

                                <div className='col-lg-12  fullWidth mt-4'>
                                    {(this.state.sortMethod && this.state.sortMethod[2])?<Route path={this.props.match.path} render={() =>  <Element item={this.state.sortMethod[2]} /> } /> :<Route path={this.props.match.path} render={() =>  <Element item={this.props.data.clothes[2]} /> } />  }
                                </div>

                            </div>
                        </div>
                        {console.log(this.props.match.path)}
                        <div className='row1 col-lg-6 d-flex flex-column' >
                            <div className="row">
                                <div className='col-lg-12 fullWidth'>
                                    {(this.state.sortMethod && this.state.sortMethod[3])? <Route path={this.props.match.path} render={() =>  <Element item={this.state.sortMethod[3]} /> } /> :<Route path={this.props.match.path} render={() =>  <Element item={this.props.data.clothes[3]} /> } />  }
                                </div>

                                <div className='col-lg-6 halfWidth mt-4'>
                                    {(this.state.sortMethod && this.state.sortMethod[4])? <Route path={this.props.match.path} render={() =>  <Element item={this.state.sortMethod[4]} /> } /> :<Route path={this.props.match.path} render={() =>  <Element item={this.props.data.clothes[4]} /> } />  }
                                </div>
                                <div className='col-lg-6 halfWidth mt-4'>
                                    {(this.state.sortMethod && this.state.sortMethod[5])? <Route path={this.props.match.path} render={() =>  <Element item={this.state.sortMethod[5]} /> } /> :<Route path={this.props.match.path} render={() =>  <Element item={this.props.data.clothes[5]} /> } />  }
                                </div>


                            </div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

export default graphql(clothesQuery)(Cathegories)