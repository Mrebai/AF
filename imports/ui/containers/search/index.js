import React , {Component,Fragment} from 'react';
import { Query } from "react-apollo";
import {clothesQuery} from '../../api/queries'
import Element from '../cathegories/element'

class Search extends Component{


    searchResults = (info ) => (
        <Query query={clothesQuery}  variables={{ info }}>
            {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error!: ${error}`;

                return (
                    <div className='container'>
                        <div className="row">
                            {
                                (data.clothes.length)?


                                    data.clothes.map(item => <div className='col-md-4'>
                                            <Element item={item}/>
                                        </div>

                                    )

                                    :
                                    <div className='d-block w-100'>
                                        <p className='itemNotFound mt-4'> ooops item not fond :(</p>
                                    </div>


                            }

                        </div>

                    </div>


                );
            }}
        </Query>
    );




    render(){
        return(
            <div>

                {   this.searchResults(this.props.match.params.data)}



            </div>

        )
    }
}

export default Search