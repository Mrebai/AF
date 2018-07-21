import React from 'react'
// components importing

import PreNav from '../containers/preNav'
import MainNav from '../containers/mainNav'
import Footer from '../containers/footer'
import SubHead from '../containers/subHeader'
import SignUp from '../containers/account/signUp'
export default store = () => {
    return(
        <div>


            <SubHead/>
            <SignUp/>
            <Footer/>
        </div>

    )
}