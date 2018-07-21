import React from 'react'
// components importing
import {Switch,Route} from 'react-router-dom'
import Dashboard from '../../containers/dashboard/index'
import ModefyItem from '../../containers/dashboard/modefyItem'
import SubHeader from '../../containers/subHeader'

export default DashBoard = ({match}) => {
    return(
        <div>
            <SubHeader/>
            <Switch>
                <Route path={`${match.url}`} component={Dashboard} />


            </Switch>
        </div>



    )
}