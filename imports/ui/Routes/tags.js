import React from 'react'
import {Switch,Route} from 'react-router-dom'
// components importing


import Footer from '../containers/footer'
import SubHead from '../containers/subHeader'
import Tags from '../containers/tags'
export default TagsRoute = ({match}) => {
    return(
        <div>
            <SubHead/>
            <Route path={match.path} component={Tags} />

            <Footer/>
        </div>

    )
}