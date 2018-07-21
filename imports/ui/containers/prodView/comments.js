import React from 'react'
import ta from 'time-ago'
export default Comments = ({key,review}) => {

    return(
        <div  key={key} className="card text-center commentCard mt-4">
            <div className="card-header d-flex flex-row ">
                {review.userEmail}
                <div  className='mx-4'  style={{color:'#ded3aa'}}>
                    {console.log(review)}
                    <div className="stars" ><i  className={'fas fa-star'}></i></div>
                    <div className="stars" ><i  className={(review.rate <2)? null :'fas fa-star'}></i></div>
                    <div className="stars" ><i  className={(review.rate <3)? null :'fas fa-star'}></i></div>
                    <div className="stars" ><i  className={(review.rate <4)? null :'fas fa-star'}></i></div>
                    <div className="stars" ><i  className={(review.rate <5)? null :'fas fa-star'}></i></div>
                </div>
                <div className="text-muted ml-auto">
                    {ta.ago( Number(review.date))}
                </div>
            </div>
            <div className="card-body ">

                {review.content}

            </div>

        </div>
    )
};