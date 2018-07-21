import React, {Component} from 'react'

import Location from './location'
import MyMap from './map'
import {London,NewYork,Paris} from './locationInfos'
export default class Stores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLocation:'LONDON',
            deliveredContent :London};
    }

    setLocation = (location) => {
        this.setState({selectedLocation:location});
        this.deliverContent(location);
    };

    deliverContent = (location) => {
      if (location === 'LONDON') {
          this.setState({deliveredContent:London})
      } else if (location === 'NEW YORK'){
          this.setState({deliveredContent:NewYork})
      } else {
          this.setState({deliveredContent:Paris})
      }
    };
    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <Location title={'LONDON'} subTitle={'180-182 Regent Street, London, W1B 5BT' } location={this.setLocation}
                                  text={'Lorem ipsum dolor sit amet, consectetur adipiscing esi elit. Vivamus at arcu sem. Vestibulum ornare eleifendit massa, nec tempor odio. Fusce posuere nunc iaculis ligula viverra iaculis. Aliquam erat volutpat.'} />

                        <Location title={'NEW YORK'} subTitle={'109 Columbus Circle, New York, NY 10023'}  location={this.setLocation}
                                  text={'Nunc non posuere nisl. Etiam finibus vel dui nec lobortis. Aliquam egestas, sem quis condimentum venenatis, erat leo fermentum dolor, non sollicitudin massa mi eu nibh. Nullam vitae aliquam dui, non sodales nisl.'} />

                        <Location title={'PARIS'} subTitle={'2133 Rue Saint-Honoré, 75001 Paris'}  location={this.setLocation}
                                  text={'Ut interdum fermentum blandit. Donec nec lacus egetit mi rhoncus eleifend. Curabitur laoreet nisl eget rutruml auctor. Vestibulum ante ipsum primis in faucibus orcip luctus et ultrices posuere cubilia curae cras ligula.'} />
                    </div>
                </div>

            <MyMap locationInfo={this.state.deliveredContent} />
            </div>
        )

    }

}