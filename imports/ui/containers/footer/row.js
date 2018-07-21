import React from 'react'


export default row = ({title,content}) =>{
    return(
        <div className=" col-lg-3">
            <ul className="list-group">
                <li className="list-group-item footerTitle">{title}</li>
                {content.map(function(item,i){
                    if(title === 'CONTACT'){
                        return(<li key={i} className="list-group-item footerContent">{item} </li>)
                    }
                    return(<li key={i} className="list-group-item footerContent"><a href="#" className="footerLink">{item}</a> </li>)
                })}
            </ul>
        </div>
    )
};