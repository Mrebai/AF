import React, {Fragment} from 'react'
import {Router,Link,Route} from 'react-router-dom'
import {graphql} from 'react-apollo'
import cloudinary from "cloudinary";
import {Image} from 'cloudinary-react'
import setUpcloudinary  from '../CoudinaryInit'

import {DeleteItem} from '../../api/mutations'



const ItemCard = ({info,deleteMutation}) => {
    setUpcloudinary(cloudinary);

    deleteButtonClicked = (id) => {
        deleteMutation({
            variables:{
                id
            }
        }).then(message => {
            console.log(message)
        }).catch(e => {
            console.log(e)
        })
    };

    return(
        info.clothes.map(function(item){
            return <Fragment key={item._id}>
                <div className=" cardContainer col col-md-4">
                    <div className=" cardInnerContainer">
                        <div className='d-flex justify-content-center'>
                            <Image className='itemImg' cloudName="dg16brf0l" publicId={item.mainImg} height="300" width='auto' crop="scale" />
                        </div>

                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                        </div>

                        <div className="list-group-item"> <p>{'Item ID: ' + item.productId}</p>

                            <div className=" d-flex buttonsEdit justify-content-around">
                                <Link className='editItem' to={'/dashboard/' + item._id}>edit</Link>

                                <a href="#" className=" deleteItem" onClick={() => {deleteButtonClicked(item._id)}}> delete</a>
                            </div>
                        </div>
                    </div>


                </div>
            </Fragment>

        })




    )
};

export default graphql(DeleteItem, {name:'deleteMutation'})(ItemCard)