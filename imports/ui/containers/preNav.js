import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {userQuery} from '../api/queries'
import PreNavCart from './cart/preNavCart'
import {Query} from 'react-apollo'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import cloudinary from "cloudinary";
import {Image} from 'cloudinary-react'
import setUpcloudinary  from './CoudinaryInit'



class PreNAv extends Component {
  constructor(props) {
    super(props);
    this.state = {active: "hidden",
    position : 0
    };

  };



  componentDidMount(){
      setUpcloudinary(cloudinary);

          window.addEventListener('scroll', this.setposition)
  };
    componentWillUnmount(){
        window.removeEventListener('scroll',this.setposition)
    };

  setposition = () =>{
      console.log(this.state.position);
      return this.setState({position:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0 })
  };



    checkUser = () => {
    try {
        const userid = ( this.props.client.readQuery({
                query: userQuery
            })
        );
        return(userid.user._id);

    }catch(e) {
      return null;
    }

    };



  setButtonState= () => {
    (this.state.active === "shown")? this.setState({active:"hidden"}) : this.setState({active:"shown"});
    console.log(this.state.active)
  };

     cartQuery = ( ) => (
        <Query query={userQuery}>
            {({ loading, error, data,client }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return (
                    <div className={'hoverCart ' + this.state.active }>

                        <PreNavCart cart={data.user.cart} reset={this.props.client}/>
                        <div className='totalPrice d-flex justify-content-between'>
                            <p> Total : {data.user.totalPrice}</p>
                            <button className='btn btn-link CheckOut'> Check Out</button>
                        </div>

                    </div>

                );
            }}
        </Query>);
  render(){
    return(
<div>
    <nav className="navbar navbar-expand justify-content-between topNav ">

        <div className="container nav-container ml-5 mr-5 d-flex flex-row-reverse">

            <div className="navbar-nav mr-8 topNav-nav accountNav  ">
                {(this.checkUser())? (
                        <Link to='/' onClick={() => {Meteor.logout(); this.props.client.resetStore();}} className="nav-item nav-link active" href="#">Sign Out <span className="sr-only">(current)</span></Link>
                    ):

                    <React.Fragment>
                        <Link to='/signup' className="nav-item nav-link active" href="#">Register <span className="sr-only">(current)</span></Link>
                        <Link to='/signin' className="nav-item nav-link ml-4" href="#">Sign In</Link>
                    </React.Fragment>
                }


                    <div   onClick={this.setButtonState}  className="d-flex flex-column ml-5">
                        <div className={ this.state.active + " cartContent"}></div>
                        <button style={ (!this.state.position > 0 )? {width:'150px', animationName:'expand', animationDuration:'1s', animationFillMode:'both'} :{width:'40px', animationName:'shrink', animationDuration:'1s' ,animationFillMode:'both'} }  className= "nav-item btn btn-link " id="myCart"><span className="fas fa-shopping-cart mr-4"></span>Cart <span className="fas fa-angle-down ml-2"></span></button>

                    </div>


            </div>
        </div>

    </nav>
    {this.cartQuery()}
</div>


    )
  }

}
export default (PreNAv);