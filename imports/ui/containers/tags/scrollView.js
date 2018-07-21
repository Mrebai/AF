import React from 'react'
import Slider from "react-slick";
import {Route} from 'react-router-dom'
import cloudinary from "cloudinary";
import {Image} from 'cloudinary-react'
import setUpcloudinary  from '../CoudinaryInit'
import Element from '../cathegories/element'
import Home from "../../Routes/home";

const settings = {
    dots: true,
    infinite: false,
    lazyLoad: 'ondemand',
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,

    centerPadding: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

export default ScrollView = ({infos,title,match}) => {
    setUpcloudinary(cloudinary);
    console.log(match);

        return(

            <div className='container mb-5 mt-5'>

                <h2> {title} </h2>
                <Slider {...settings}>
                    {infos.map(item =>
                            <div key={item._id} >
                                <Element item = {item} />
                            </div> )}
                </Slider>
            </div>
        )



}

