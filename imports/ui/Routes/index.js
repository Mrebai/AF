import React from 'react'
import {BrowserRouter,Route,Switch,Link} from "react-router-dom"
import Home from './home'
import TheBrand from './theBrand'
import Store from './stores'
import SignIn from './signIn'
import ProductRoute from './product'
import SignUp from './signUp'
import PreNav from '../containers/preNav'
import MainNav from '../containers/mainNav'
import DashBoard from './dashboard/index'
import TagsRoute from './tags'
import SearchRoute from './search'
//ss
export default Routes = ({client,id}) => {
    return(
        <BrowserRouter>
            <div>
                {(Meteor.userId())?  <Link className='adminDashboard' to='/dashboard'>go to dashboard</Link> : <div></div>}

                <PreNav client={client}/>
                <MainNav client={client}/>
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    <Route path={"/brand"} component={TheBrand}/>
                    <Route path={"/stores"} component={Store}/>
                    <Route path={"/signin"} render={() => <SignIn client={client}/> } />
                    <Route path={"/signup"} component={SignUp} />
                    <Route path={"/product"} component={ProductRoute} />
                    <Route path={"/dashboard"} component={DashBoard}/>
                    <Route path={"/tags"} component={TagsRoute}/>
                    <Route path={"/search"} component={SearchRoute}/>
                    <Route render={() => <p>
                        404 not found
                    </p> }/>
                </Switch>
            </div>


        </BrowserRouter>

    )
}