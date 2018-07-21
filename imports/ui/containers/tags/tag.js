import React from 'react'
import Element from '../cathegories/element'
export default TagFind = ({infos,match}) => {

    return(
        <div className='container'>
            <h3 className='mt-4 mb-4 titleOfCat'> {( match.match.params.gender ==='m')? 'MEN -  ' + match.match.params.tag.toUpperCase(): ( match.match.params.gender === 'f')? 'WOMEN -  ' + match.match.params.tag.toUpperCase():''} </h3>
            <div className="row">

                    {infos.filter(item => (item.tags.indexOf(match.match.params.tag) !== -1 && item.gender === match.match.params.gender))
                        .map(item =>
                            <div key={item._id} className='col-md-4'>
                                 <Element item = {item} />
                            </div> )}

            </div>
        </div>
    )
};