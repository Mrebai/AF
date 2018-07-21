import React,{Component} from 'react'
import cloudinary from "cloudinary";
import {Image} from 'cloudinary-react'
import setUpcloudinary  from '../CoudinaryInit'
import {graphql} from 'react-apollo'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import {UpdateItem} from '../../api/mutations'
import {withRouter} from 'react-router-dom'



class ModefyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receivedData :{...this.props.info.clothes.filter(thing => thing._id === this.props.match.params.id)[0]} ,
            checkedGender: 'm',
            comingSoon : false,
            newArrival : false,
            availability : false,
            image : [],
            mainImg:null
        }
    }

    componentWillMount(){
        setUpcloudinary(cloudinary);
    }
    componentDidMount(){
        this.setState(
            {
                checkedGender: this.state.receivedData.gender,
                comingSoon:this.state.receivedData.comingSoon,
                newArrival:this.state.receivedData.newArrival,
                availability:this.state.receivedData.availability,
                image:this.state.receivedData.img,
                mainImg : this.state.receivedData.mainImg
            })
    }
    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "x7ne7zx3"); // Replace the preset name with your own
            formData.append("api_key", "192597396342249"); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/codeinfuse/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            }).then(response => {
                const data = response.data;

                this.setState({image: this.state.image.concat( data.public_id ) });


                console.log(this.state.image);
            })
        });

    };
    genderCheck = (e) => {

        this.setState({
            checkedGender: e
        });
    };

    toggleState= (num) => {
        if(num === 0){
            this.setState({
                comingSoon: !this.state.comingSoon
            })
        }

        if(num === 1){
            this.setState({
                newArrival: !this.state.newArrival
            })
        }

        if(num === 2){
            this.setState({
                availability: !this.state.availability
            })
        }
    };


    submitNewItem=(e) => {
        e.preventDefault();
        this.props.updateItemMutation({
            variables:{
                updateId : this.state.receivedData._id,
                name:(this.name.value)? this.name.value: null,
                gender:(this.state.checkedGender)? this.state.checkedGender: null,
                tags: (this.tags.value)? this.tags.value.split(',') : null,
                img:(this.state.image)? this.state.image : null,
                mainImg:(this.state.mainImg)? this.state.mainImg: null,
                description:(this.desc.value)? this.desc.value : null,
                video:(this.video.value)? this.video.value : null,
                size:(this.sizes.value)? this.sizes.value.split(',') : null,
                colors:(this.colors.value)? this.colors.value.split(',') : null,
                productId:(this.prodId.value)? this.prodId.value : null,
                oldPrice:(this.oldPrice.value)? this.oldPrice.value : null,
                price:(this.price.value)? this.price.value : null,
                comingSoon: this.state.comingSoon,
                newArrival: this.state.newArrival,
                availability: this.state.availability

            }
        }).then(({data}) => {
            console.log("data uploaded" );
            console.log(data )
            this.props.history.push('/dashboard');
        }).catch(({e}) => {
            console.log("upload failed" );
            console.log(e)
        });
    };


    render(){
        return(
            <div className='container'>
                {console.log( this.state.receivedData)}
                {console.log( this.props.info.clothes[0]._id)}
                <div className="row">
                    <div className=" offset-md-2 col-md-8  offset-md-2">
                        <form onSubmit={this.submitNewItem}>
                            <Image cloudName="dg16brf0l" publicId="rwz0l7qovkgxvv3xtquq" width="300" crop="scale" />

                            {console.log( this.state.comingSoon)}
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="itemName" >Product name*</label>
                                <div className="col-sm-10">
                                    <input required type="text"  defaultValue={this.state.receivedData.name} className=" form-control" id="itemName" placeholder="enter the name of the item" ref={input => this.name= input}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="itemGender" >Product gender*</label>
                                <div className="form-check form-check-inline" id='itemGender'>
                                    <input onChange={() => {this.genderCheck("m")}} checked={this.state.checkedGender === 'm'} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="m" required/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">M</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input onChange={() => {this.genderCheck("f")}} checked={this.state.checkedGender === 'f'}  className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="f" required/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">F</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input onChange={() => {this.genderCheck("x")}} checked={this.state.checkedGender === 'x'}  className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="x" required/>
                                    <label className="form-check-label" htmlFor="inlineRadio3">X(undefined)</label>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="itemTag" >Tags</label>
                                <div className="col-sm-10">
                                    <input type="text" className=" form-control" id="itemTag" defaultValue={this.state.receivedData.tags.join()} placeholder="separate each tag with space" ref={input => this.tags= input}/>
                                </div>
                            </div>


                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="itemDesc" >Description*</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" id="itemDesc"  defaultValue={this.state.receivedData.description} placeholder='describe the product' rows="3" ref={input => this.desc= input}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="itemVideo" >Video</label>
                                <div className="col-sm-10">
                                    <input type="text" className=" form-control" id="itemVideo" placeholder="enter the url of the video" defaultValue={this.state.receivedData.video} ref={input => this.video= input}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="itemImg" >Images</label>

                                <div className="col-sm-10" id='itemImg'>
                                    <Dropzone
                                        className="dropzone"
                                        onDrop={this.handleDrop}
                                        multiple
                                        accept="image/*"
                                    >
                                        <p>Drop your files or click here to upload</p>
                                    </Dropzone>
                                </div>
                            </div>

                            <div className="container">
                                <div className="d-flex flex-row addItemImgContainer">
                                    {console.log(this.state.mainImg)}

                                    {
                                        (  this.state.image.length )?(
                                                this.state.image.map((image,i) => {
                                                    return(

                                                        <div className='imgContainer' key={i} >

                                                            <Image className="imgPrev" cloudName="dg16brf0l" publicId={image} />
                                                            <button className=" btn btn-link mainImg" onClick={()=> {this.setState({image:this.state.image.filter(a => a!== image)})}} > <i className="far fa-window-close"></i></button>
                                                            {(this.state.mainImg !== image)?
                                                                <button className=" btn link mainImg" onClick={()=> {this.setState({mainImg:image})}}> <i className="fas fa-thumbtack"></i></button>
                                                                : <div></div> }
                                                        </div>
                                                    )
                                                })
                                            ):
                                            <div></div>

                                    }

                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="itemSize" >Sizes*</label>
                                <div className="col-sm-10">
                                    <input type="text" className=" form-control" id="itemSize" placeholder="separate each size with space" defaultValue={this.state.receivedData.size.join()} ref={input => this.sizes= input} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="itemColor" >Colors*</label>
                                <div className="col-sm-10">
                                    <input type="text" className=" form-control" id="itemColor" placeholder="separate each color with space" defaultValue={this.state.receivedData.colors.join()} ref={input => this.colors= input} required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="itemId" >Product ID*</label>
                                <div className="col-sm-10">
                                    <input type="text" className=" form-control" id="itemId" placeholder=" give this item a unique ID" defaultValue={this.state.receivedData.productId} ref={input => this.prodId= input}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col col-lg-6">
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label" htmlFor="itemPrice" >Price* </label>
                                        <div className="col-sm-8">
                                            <input type="text" className=" form-control" id="itemPrice" placeholder=" put the current price" defaultValue={this.state.receivedData.price} ref={input => this.price= input} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-lg-6">
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label" htmlFor="itemOldPrice" >Old Price</label>
                                        <div className="col-sm-8">
                                            <input type="text" className=" form-control" id="itemOldPrice" placeholder=" put the old price if exists"  defaultValue={this.state.receivedData.oldPrice} ref={input => this.oldPrice= input}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-around mt-4">
                                <div className="col col-lg-2">
                                    <div className="form-check">
                                        <input checked={this.state.comingSoon} onChange={ () => {this.toggleState(0)}} type="checkbox" className="form-check-input" id="itemComingSoon"/>
                                        <label className="form-check-label" htmlFor="itemComingSoon">coming Soon</label>
                                    </div>
                                </div>
                                <div className="col col-lg-2">
                                    <div className="form-check">
                                        <input checked={this.state.newArrival} onChange={ () => {this.toggleState(1)}} type="checkbox" className="form-check-input" id="itemNewArrival"/>
                                        <label className="form-check-label" htmlFor="itemNewArrival"> New Arrival</label>
                                    </div>
                                </div>
                                <div className="col col-lg-2">
                                    <div className="form-check">
                                        <input checked={this.state.availability} onChange={ () => {this.toggleState(2)}} type="checkbox" className="form-check-input" id="itemAvailable"/>
                                        <label className="form-check-label" htmlFor="itemAvailable">Available</label>
                                    </div>
                                </div>
                            </div>
                            <div className=" d-flex justify-content-end mt-5 mr-5">

                                <button type="submit" className="btn btn-link formBtn mx-4"> Add item</button>
                                <button  onClick={() => this.props.history.push('/dashboard') } className="btn btn-link  mx-4 mt-2"> Cancel</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        )
    }

}

export default graphql(UpdateItem,{name:'updateItemMutation',options:{refetchQueries:["clothes"]}})(withRouter(ModefyItem));