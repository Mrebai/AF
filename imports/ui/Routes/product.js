import React from 'react'
import {Switch,Route} from 'react-router-dom'
// components importing


import Footer from '../containers/footer'
import SubHead from '../containers/subHeader'
import Product from '../containers/prodView'
export default ProductRoute = () => {
    return(
        <div>
            <SubHead/>
            <Route path={"/product/:id"} component={Product} />

            <Footer/>
        </div>

    )
}