import React from 'react'
import {Link} from 'react-router-dom'
import {

    DropdownItem } from 'reactstrap';

export default dropNav= ({gender,casual,formal}) => {

  return(
    <div className={"drop "}>
      <div className="row">
        <div className="col-md-6 ">
          <h6 className="Casual navListTitle">CASUAL</h6>
          <ul className="list-group list-group-flush">
              {
                  casual.map(function(item, i){

                      return  <i key={i} className="list-group-item menu-drop"><Link className='btn btn-link menuBtn' to={'/tags/' + gender + '/' + item }>{item.toUpperCase()}</Link> </i>

                  })
              }
        </ul>
      </div>
      <div className="col-md-6">
        <h6 className="formal navListTitle">FORMAL</h6>
          <ul className="list-group list-group-flush">
              {
                  formal.map(function(item, i){

                      return  <li key={i} className="list-group-item menu-drop"><Link className='btn btn-link menuBtn' to={'/tags/' + gender + '/' + item }>{item.toUpperCase()}</Link> </li>

                  })
              }
          </ul>
      </div>
    </div>

    <div className="sails-cotainer">
        <div className="sails">
            <div className='sail '></div>
            <h4>AUTUMN SALES UP TO 50% OFF</h4>
        </div>
    </div>
  </div>
)
}
