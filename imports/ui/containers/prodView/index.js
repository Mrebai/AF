import React, {Component} from 'react'
import Slider from "react-slick";
import {Query,graphql,compose } from 'react-apollo'
import {clothesQuery} from '../../api/queries'
import cloudinary from "cloudinary";
import {Image} from 'cloudinary-react'
import setUpcloudinary  from '../CoudinaryInit'
import {setReview,addCart,addlike} from '../../api/mutations'
import Comments from './comments'
import {Link} from 'react-router-dom'



class Product extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stars : [1,1,1,1,1],
            clickedStars : [1,1,1,1,1],
            Clicked:false,
            showReview: 'hidden',
            showMessage:'hidden',
            prodId: null,
            reviews:null,
            rate:null,
            error:' ',
            color:null,
            like:null

        }
    };
    componentDidMount(){
        setUpcloudinary(cloudinary);

    }
    setId = (e) =>{
        this.setState({prodId:e});

    };

    toggleView = (e) => {
        const filtered = e.filter(element => element.userID === Meteor.userId());

        (this.state.showReview === 'hidden')? this.setState({showReview:'shown'}) : this.setState({showReview:'hidden'});


    };

checkField=() => {
    if(this.reviews.value && this.state.rate ){
        return (true)
    }
    return(false)
};
    submitReview = (e) => {
        e.preventDefault();
        if(!this.reviews.value){
            return (this.setState({error:'please fill the review'}))
        }
        if(!this.state.rate){
            return (this.setState({error:'please rate this product'}))
        }
        this.setState({error:null});
        this.props.addReview({
            variables:{
                rate:this.state.rate,
                prodId:this.state.prodId,
                review: this.reviews.value
            }
        });
        return (this.setState({error:null}))
    };
    changeStarsFinal = (e) =>{
        if(e === 1){
            this.setState({clickedStars:[.8,.5,.5,.5,.5]})
        }
        if(e === 2){
            this.setState({clickedStars:[.8,.8,.5,.5,.5]})
        }
        if(e === 3){
            this.setState({clickedStars:[.8,.8,.8,.5,.5]})
        }
        if(e === 4){
            this.setState({clickedStars:[.8,.8,.8,.8,.5]})
        }
        if(e === 5){
            this.setState({clickedStars:[.8,.8,.8,.8,.8]})
        }
        if(e === 6){
            this.setState({clickedStars:[.3,.3,.3,.3,.3]})
        }
    };

    changeClickedStars = (e) =>{
        this.setState({Clicked:true});
        this.setState({rate:e});
        if(e === 1){
            this.setState({stars:[1,.3,.3,.3,.3]});
        }
        if(e === 2){
            this.setState({stars:[1,1,.3,.3,.3]})
        }
        if(e === 3){
            this.setState({stars:[1,1,1,.3,.3]})
        }
        if(e === 4){
            this.setState({stars:[1,1,1,1,.3]})
        }
        if(e === 5){
            this.setState({stars:[1,1,1,1,1]})
        }


    };
     Dogs = () => (
        <Query query={clothesQuery} variables={{ id: this.props.match.params.id, reftech:this.state.refetch}} >

            {({ loading, error, data,refetch  }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                const settings = {
                    className:'slideContainer',
                    centerMode:true,
                    arrows:true,
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: 0
                };

                changeStars= (e) => {
                    this.changeStarsFinal(e)
                };
                getId = (e) => {
                    this.setId(e)

                };

                likeToggle= () => {
                    (data.clothes[0].likesByUser)? this.setState({like:'DELETE FAVORITE'}):  this.setState({like:'ADD TO FAVORITE'})
                };

                addtoCart = (e) => {
                    e.preventDefault();
                    this.props.addCart({
                        variables:{
                            itemId: data.clothes[0]._id,
                            name:data.clothes[0].name,
                            img:data.clothes[0].mainImg,
                            price:data.clothes[0].price,
                            color:this.color.value,
                            size:this.size.value,
                            number: (this.quantity.value)? this.quantity.value:1,
                        }
                    }).then(data => {
                        console.log(  data)

                    });

                };

                addToLike= () => {
                    this.props.addlike({
                        variables:{
                            itemId: data.clothes[0]._id,
                        }
                    }).then(data => {
                        console.log(  data);
                        likeToggle()

                    });

                };
                populatestart = (e) => {

                    if( data.clothes[0].totalRate > e +  0.9 ) {return 'fas fa-star';}
                    if( data.clothes[0].totalRate <= e ) {return "";}
                    return "fas fa-star-half"
                };


                return (
                    <div className='productContainer'>
                        {() => this.getId()}

                        <div className="container">
                            <div className="row mt-5 ">
                                <div className="col-xl-5 align-self-center">
                                    <Slider {...settings}>
                                        {data.clothes[0].img.map((image,i) => <div className='sliderContainer' key={i}> <Image cloudName="dg16brf0l" publicId={image} width="300" crop="scale" /></div>)}
                                    </Slider>
                                </div>
                                <div className="col-xl-7 pl-2">
                                   <div className={'mx-4'}>
                                       <h6 className='itemTitle'>{data.clothes[0].name}</h6>
                                       <div className="row d-flex align-items-center">
                                           <div className='px-2' style={{color:'#ded3aa'}}>

                                               <div className="stars" ><i  className={'fas fa-star'}></i></div>
                                               <div className="stars" ><i  className={populatestart(1)}></i></div>
                                               <div className="stars" ><i  className={populatestart(2)}></i></div>
                                               <div className="stars" ><i  className={populatestart(3)}></i></div>
                                               <div className="stars" ><i  className={populatestart(4)}></i></div>
                                           </div>

                                           <button c='addReview' onClick={() => {this.toggleView( data.clothes[0].reviews); getId( data.clothes[0]._id)}} className="btn btn-link  addReview addReviewBtn mx-3"> Add a Review</button>
                                       </div>
                                       <div className="row">
                                           <p className='itemPrice oldPrice mx-2'>{(data.clothes[0].oldPrice)? data.clothes[0].oldPrice:null}</p>
                                           <p className='itemPrice ml-3' >{data.clothes[0].price}</p>
                                       </div>
                                       <div className={"form-group " + this.state.showReview}>

                                           <div style={{color:'#ded3aa'}}>

                                               <div className="stars" style={(this.state.Clicked)?{opacity:this.state.stars[0]}:{opacity:this.state.clickedStars[0]}} onMouseEnter={()=> {changeStars(1)}} onMouseLeave={()=> {changeStars(6)}} onClick={()=> {this.changeClickedStars(1)}}><i  className='fas fa-star'></i></div>
                                               <div className="stars" style={(this.state.Clicked)?{opacity:this.state.stars[1]}:{opacity:this.state.clickedStars[1]}} onMouseEnter={()=> {changeStars(2)}} onMouseLeave={()=> {changeStars(6)}} onClick={()=> {this.changeClickedStars(2)}}><i  className='fas fa-star'></i></div>
                                               <div className="stars" style={(this.state.Clicked)?{opacity:this.state.stars[2]}:{opacity:this.state.clickedStars[2]}} onMouseEnter={()=> {changeStars(3)}} onMouseLeave={()=> {changeStars(6)}} onClick={()=> {this.changeClickedStars(3)}}><i  className='fas fa-star'></i></div>
                                               <div className="stars" style={(this.state.Clicked)?{opacity:this.state.stars[3]}:{opacity:this.state.clickedStars[3]}} onMouseEnter={()=> {changeStars(4)}} onMouseLeave={()=> {changeStars(6)}} onClick={()=> {this.changeClickedStars(4)}}><i  className='fas fa-star'></i></div>
                                               <div className="stars" style={(this.state.Clicked)?{opacity:this.state.stars[4]}:{opacity:this.state.clickedStars[4]}} onMouseEnter={()=> {changeStars(5)}} onMouseLeave={()=> {changeStars(6)}}  onClick={()=> {this.changeClickedStars(5)}}><i  className="fas fa-star"></i></div>
                                           </div>

                                           <textarea className="form-control" id="exampleFormControlTextarea1" ref={(input) => this.reviews = input} rows="3"></textarea>
                                           <button onClick={(e) => { this.submitReview(e) ; (this.checkField())? refetch(): null}} className="btn btn-link addReview">Submit Review</button>
                                       </div>



                                       <div className="d-flex flex-column">
                                           <div className="p-2 itemDetailsTitles">AVAILABILITY:  <span style={(data.clothes[0].availability)? {color:'green'}:{color:'red'}} className='itemDetails'> {(data.clothes[0].availability)? "In Stock": "Out Of Stock"}</span> </div>
                                           <div className="p-2 itemDetailsTitles">PRODUCT CODE:  <span className='itemDetails'> {data.clothes[0].productId}</span> </div>
                                           <div className="p-2 itemDetailsTitles">TAGS:          <span className='itemDetails'> {data.clothes[0].tags.map(tag =>   <Link className='addReview' to={'/tags/' +data.clothes[0].gender + '/' +  tag}> {tag}</Link> , )}</span> </div>
                                       </div>

                                       <p className='itemDesc text-justify'>{data.clothes[0].description}</p>


                                       <form onSubmit={(e) => addtoCart(e)}>
                                           <div className="row">
                                               <div className="form-group col">
                                                   <label htmlFor="exampleFormControlSelect1">Color</label>
                                                   <select ref={(input) => this.color = input} className="form-control" id="exampleFormControlSelect1" placeholder="Select Color">
                                                       {data.clothes[0].colors.map((colors,i) =>   <option onChange={() => {this.state({color:colors})}} key={i}>{colors}</option>)}
                                                   </select>
                                               </div>
                                               <div className="form-group col">
                                                   <label htmlFor="exampleFormControlSelect1">Size</label>
                                                   <select ref={(input) => this.size = input} className="form-control" id="exampleFormControlSelect1" placeholder="Select Size">
                                                       {data.clothes[0].size.map((size,i) =>   <option key={i}>{size}</option>)}
                                                   </select>
                                               </div>
                                               <div className="form-group col">
                                                   <label htmlFor="exampleFormControlInput1">quantity</label>
                                                   <input ref={(input) => this.quantity = input} type="number" className="form-control" id="exampleFormControlInput1" min="1" placeholder="1"/>
                                               </div>
                                           </div>


                                       <div className=" d-flex justify-content-around mt-2 mb-4">
                                           <div >
                                               <button type="submit"  className="btn btn-link locationBtn"> <i class="fas fa-cart-plus"></i> ADD TO CART</button>
                                           </div>
                                               <div >
                                                   <button className="btn btn-link locationBtn" onClick={() => {addToLike()}}> <i class="far fa-heart"></i>  {this.state.like || (data.clothes[0].likesByUser)?'DELETE FAVORITE':'ADD TO FAVORITE'}</button>
                                               </div>
                                       </div>
                                       </form>
                                   </div>
                                </div>

                                {
                                    data.clothes[0].reviews.map(rev =>
                                        <Comments key={rev._id} review={rev}/>
                                    )
                                }
                            </div>

                        </div>

                    </div>

                );
            }}
        </Query>
    );
    render(){

        return(
            <div>
                {this.Dogs()}
            </div>

        )
    }
}

export default compose( graphql(addCart,{name:'addCart',options:{refetchQueries:["user",'clothes']}}),graphql(addlike,{name:'addlike',options:{refetchQueries:["user"]}}),graphql(setReview,{name:'addReview',options:{refetchQueries:["clothes"]}}) ) (Product)