import React from 'react'
// components importing

import PreNav from '../containers/preNav'
import MainNav from '../containers/mainNav'
import Footer from '../containers/footer'
import SubHead from '../containers/subHeader'
import Stores from '../containers/stores'
export default store = () => {
    return(
        <div>


            <SubHead/>
            <Stores/>
            <Footer/>
        </div>

    )
}