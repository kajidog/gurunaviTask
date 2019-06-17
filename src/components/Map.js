import React, { createRef, Component } from 'react'
import { Map as Atlas, TileLayer, Marker, Popup } from 'react-leaflet'

export default class Map extends Component {
    mapRef = createRef();

    componentWillMount(){
      this.props.getCurrentLocation();
    }
    render() {
      const marker = this.props.hasLocation ? (

          <Marker position={{lat:this.props.latlng.lat, lng:this.props.latlng.lng}}>
              <Popup>
                  <span>You are here</span>
              </Popup>
          </Marker>
      ) : null
        return (
          <div>
            {this.props.hasLocation ?  <div /> : <p>現在地の取得中です</p>}
            <Atlas
                center={this.props.latlng}
                length={2}
                ref={this.mapRef}
                zoom={17}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                  this.props.hasLocation ?
                  <div>
                    {marker}
                    {this.props.response.rest.map((value,i=0)=>(
                     !Object.keys(value.latitude).length?
                    null
                    :
                    <Marker position={{lat:value.latitude-0+0.003225, lng:value.longitude-0-0.00278}}>
                        <Popup>
                            <span>{value.name}</span>
                        </Popup>
                    </Marker>
                  ))}
                  </div>
                  :
                  <div />
                }
            </Atlas>
          </div>
        )
    }
}
