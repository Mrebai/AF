import React ,{Component} from 'react'
import cloudinary from "cloudinary";
import {graphql} from 'react-apollo'
import {Image} from 'cloudinary-react'
import {Switch,Link,Route} from 'react-router-dom'
import setUpcloudinary  from '../CoudinaryInit'
import Product from "../prodView";
import {addlike} from '../../api/mutations'

class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {active: "none", liked: false}
        };

    componentDidMount(){
      this.setState({liked:this.props.item.likesByUser})
    };
    addToLike= () => {
        this.props.addlike({
            variables:{
                itemId: this.props.item._id,
            }
        }).then(data => {
            this.setState({liked:!this.state.liked});
            console.log(this.state.liked);


        }).catch(e => {
            console.log(e)
        });

    };

    componentWillMount(){
        setUpcloudinary(cloudinary);

    }


    hoverItem = (action) => {
        if(action === 'hidden'){
            return(this.setState({active:'none'}))
        }

        return(this.setState({active:'block'}))
    };


    render(){
        return(
            <div>

                <div className="card p-2" onMouseEnter={() => {this.hoverItem(action='shown')}} onMouseLeave={() => {this.hoverItem(action='hidden')}}>
                    <div style={{'backgroundImage':'url(http://res.cloudinary.com/dg16brf0l/image/upload/'+  this.props.item.mainImg + ')', height:'300px' ,  backgroundSize: ' auto 300px', backgroundRepeat:'no-repeat' , backgroundPosition:'center'}}>
                        <p className="price ml-3">{ this.props.item.price}</p>
                        <div className= { "d-flex align-items-end flex-column thumbs"} style={{display: this.state.active}}>
                            {
                                this.props.item.img.map((img,i) =>{
                                    return (     <img key={i} style={{display: this.state.active}} className={"previewImg in " + this.state.size}  src={"http://res.cloudinary.com/dg16brf0l/image/upload/"+ img} alt="Card image cap"/>)
                                })

                            }

                        </div>

                    </div>

                    <div className="card-body">
                        <h4 className='card-text'>{this.props.item.name}</h4>
                        <p className="card-text " style={{color:'#868686'}}>{ this.props.item.description}</p>
                        <div className="d-flex  justify-content-center">
                            <Link className="cardEnd mx-3" to={'/product/'+ this.props.item._id}>   <span title="Edit">
                            <i className="fas fa-shopping-cart icon" aria-hidden="true"></i>
                          </span></Link>

                            <button style={(this.state.liked)? {backgroundColor:'#00C8C8'} : {backgroundColor:'#727272'}} onClick={() => this.addToLike()} className=" btn btn-link cardEnd mx-3">
                                <span className='far fa-heart icon'></span>
                            </button>


                        </div>
                    </div>
                </div>


            </div>
        )
    }

}

export default graphql(addlike,{name:'addlike',options:{refetchQueries:["user"]}})(Element)