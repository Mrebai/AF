import React,{Component,Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import cloudinary from "cloudinary";
import {Image} from 'cloudinary-react'
import setUpcloudinary  from '../CoudinaryInit'
import {deleteCart} from '../../api/mutations'
import {graphql} from 'react-apollo'

class PreNavCart extends Component {
    componentDidMount(){
        setUpcloudinary(cloudinary);
    }

    deleteFromCart = (e) => {
        console.log(e);
        this.props.deleteCart({
            variables:{
                id:e
            }
        }).then(res =>  console.log(res)).catch(e =>
            console.log(e)
        )
    };
    render(){
        return(
            <Fragment>
                {

                    this.props.cart.map(item =>

                        <div key={item._id} className="cartContainer row">

                            <div className='cartImgContainer col-3'>
                                <Image className='cartImg' cloudName="dg16brf0l" publicId={item.img} width="300" crop="scale"/>
                            </div>
                            <div className=' col-9'>
                                <div className=" cartFirstRow d-flex justify-content-between">
                                    <p className='cartName '>{item.name} </p>
                                    <button onClick={() => this.deleteFromCart(item._id)} className="btn btn-link deleteCart"> <i className="fas fa-window-close"></i> </button>
            </div>

                                <div className=" d-flex justify-content-around ">
                                    <div >
                                        <p>{'color   :   '+ item.color}</p>
                                    </div>

                                    <div>
                                        <p>{'Quantity   :   '+  item.number}</p>
                                    </div>

                                    <div>
                                        <p>{'size   :   '+  item.size}</p>
                                    </div>
                                </div>

                                    <p>{'Price   :   '+  item.price}</p>


                            </div>

                            <div >
                                <p style={{textAlign:'center'}}> {'price  :    ' +  item.price*item.number}</p>
                            </div>
                        </div>


                    )
                }

            </Fragment>
        )
    }

};


export default graphql(deleteCart,{name:'deleteCart',options:{refetchQueries:["user"]}})(PreNavCart)