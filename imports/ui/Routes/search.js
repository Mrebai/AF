import React from 'react'
import {Route} from "react-router-dom"
// components importing


import Footer from '../containers/footer'
import SubHead from '../containers/subHeader'
import Search from '../containers/search'

export default SearchRoute = () => {
    return(
        <div>
            <SubHead/>

            <Route path={"/search/:data?"} component={Search}/>
            <Footer/>
        </div>

    )
}