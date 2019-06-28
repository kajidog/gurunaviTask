import React, { createRef, Component } from 'react'
import { Map as Atlas, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';

export default class Map extends Component {
  mapRef = createRef();

  componentDidMount(){
    this.props.getCurrentLocation();
  }
  render() {

    //現在地に使うマーカー
    const myIcon = L.icon({
      iconUrl: require('../images/マップピンのアイコン素材 3.png'),
      iconSize: [32,32],
      iconAnchor: [20, 42],
      popupAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null
    });

    return (

      <div>
        {this.props.display?
          <div style={{height:"30vh"}}>
            {this.props.hasLocation?
              <p>通信中</p>:<p> </p>
            }
            {
              this.props.clickShop !== null ?
              this.props.clickShop.lat === 0?
              <h3 style={{textAlign:"center", color:"red", fontSize:"16px"}}>店の位置情報は登録されていません</h3>
              :
              null
              :
              null
            }
            <Atlas
              center={{lat:this.props.clickShop.lat, lng:this.props.clickShop.lng}}
              length={5}
              ref={this.mapRef}
              zoom={17}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              this.props.clickShop !== null ?(
                  this.props.clickShop.lat !== 0?
                    <Marker position={{lat:this.props.clickShop.lat, lng:this.props.clickShop.lng}}>
                      <Popup>
                        <span>{this.props.clickShop.name}</span>
                      </Popup>
                    </Marker>
                  :
                    null
              )
              :
                null
            }
            <Marker position={{lat:this.props.latlng.lat, lng:this.props.latlng.lng}} icon={myIcon} />
            </Atlas>
          </div>
          :
          null
        }
      </div>
    )
  }
}
