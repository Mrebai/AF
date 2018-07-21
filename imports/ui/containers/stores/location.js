import React from 'react'

export default Location = ({title,subTitle,text,location}) => {
    return(
        <div className='col-md-4'>
                <h5 className="locationTitle dispaly-4 mt-2">{title}</h5>
                <p className="locationSubtext">{subTitle}</p>
                <p className="locationText"> {text} </p>
                <button className="btn btn-link locationBtn" onClick={ () => location(title)}> VIEW DETAILS </button>
        </div>
    )
}