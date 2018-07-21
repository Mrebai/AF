import React from 'react'
// components importing
import {Switch,Route} from 'react-router-dom'
import MainNav from '../containers/mainNav'
import Header from '../containers/header'
import Footer from '../containers/footer'
import Cathegories from '../containers/cathegories'
import DashBoard from "./dashboard";

export default Home = () => {
    return(
        <div>
            <Header/>
            <Route path={"/"} component={Cathegories}/>
            <Footer/>
        </div>

    )
}