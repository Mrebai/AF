import React from 'react'
// components importing

import PreNav from '../containers/preNav'
import MainNav from '../containers/mainNav'
import Footer from '../containers/footer'
import SubHead from '../containers/subHeader'
import Login from '../containers/account/login'
export default store = ({client}) => {
    return(
        <div>


            <SubHead/>
            <Login client={client}/>
            <Footer/>
        </div>

    )
}