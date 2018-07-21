import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {clothesQuery} from '../../api/queries'
import {Route,Switch} from 'react-router-dom'
import ScrollView from './scrollView'
import TagFind from './tag'
import Home from "../../Routes/home";

class Tag extends Component {
     getClothes = ( ) => (
        <Query query={clothesQuery} >
            {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error!: ${error}`;

                return (
                    <div>
                        <Switch>
                            <Route exact path={this.props.match.path + "/:gender/:tag"} render={(match) =>  <TagFind match={match}  title={null} infos={data.clothes}/>} />
                        </Switch>
                        <ScrollView  title={'MEN'} infos={data.clothes.filter( info => info.gender === 'm')}/>
                        <ScrollView title={'WOMEN'} infos={data.clothes.filter( info => info.gender === 'f')}/>

                    </div>

                );
            }}
        </Query>
    );
    render(){
        return(
            <div>

                <this.getClothes/>
            </div>

        )
    }
}

export default Tag