import React, {Component,Fragment} from 'react'
import {Link,Route,Switch} from 'react-router-dom'
import {clothesQuery} from '../../api/queries'
import { Query } from "react-apollo";


import ItemCard from './itemCard'
import ItemForm from './addItem'
import ModefyItem from './modefyItem'




class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
        view: 'list',
        input: '',
        selectedItem:'a'
        };
    }


    vertMenuSelected = (e) => {
        console.log(e)
    };

    selecteditem = (e) => {
        if(e === 'list'){
            this.setState({view:'list'})
        }
        this.setState({view:'addNew'})
    };
    selecteditem1 =(e) => {

        console.log(e)
    };
    Dogs = ({input}) => (
        <Query query={clothesQuery}  variables={{ info:this.state.input} }>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                makeStaechanger = (e) => {
                    this.vertMenuSelected(e)
                };
                backtoMain = (e) => {
                    this.selecteditem1(e)
                };

                return (

                    <div className='row'>
                        <Switch>
                            <Route exact path={`/dashboard/newitem`} component={ItemForm} />
                            <Route exact path={`/dashboard/:id`} render={() => <ModefyItem info={data}/>} />
                            <Route exact path={`/dashboard`} render={() => <ItemCard  info={data}/>



                            }
                            />
                        </Switch>


                    </div>
                );
            }}
        </Query>
    );

    seachitem =(e) => {
        e.preventDefault();

    };
    render(){
        return(
            <div>

                <div className="container d-flex flex-column dashboardContainer">
                    <div className="d-flex justify-content-center">
                        <Link className="btn btn-link" to='/dashboard/newitem'>  add New </Link>
                        <button onClick={() => {this.selecteditem('addNew')}} className="btn btn-link"> add New</button>
                        <input value={this.state.input} onChange={(e) => {
                            e.preventDefault();
                            this.setState({input:e.target.value})}} className="form-control navSearch ml-2" type="search" placeholder="Search" aria-label="Search"/>
                    </div>



                            {this.Dogs(this.state.input)}

                </div>

            </div>



        )
    }
}


export default (Dashboard)