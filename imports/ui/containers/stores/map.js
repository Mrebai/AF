import React from 'react'

export default MyMap = ({locationInfo}) => {
    return(

        <div className="row">
            <div className="col-md-8 map mt-5" style={{'backgroundImage':'url(' + locationInfo.map + ')' , backgroundRepeat:'no-repeat', backgroundPosition:'center center'}}>

            </div>
            <div className="col col-md-4 details mt-5">
                <h6 className="infoTitle dispaly-4 mt-2">{locationInfo.place}</h6>
                <p className="infoAdress">{locationInfo.address}</p>
                <p className="infoInfos">{locationInfo.infos}</p>
                <p className="infoInfos"> <i className="fas fa-map-marker-alt mr-4" ></i>{locationInfo.address}</p>
                <p className="infoInfos"><i className="fas fa-phone mr-4"></i>{locationInfo.phone}</p>
                <p className="infoInfos"><i className="fas fa-link mr-4"></i>{locationInfo.website}</p>
                <p className="infoInfos"><i className="far fa-envelope mr-4"></i>{locationInfo.email}</p>
                <p className="infoInfos"><i className="far fa-clock mr-4"></i>{locationInfo.openTime}</p>
            </div>
            {console.log(locationInfo)}
        </div>
    )
}