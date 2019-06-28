import {connect} from 'react-redux';
import Map from '../components/Map'
import {getCurrentLocation} from '../actions/Map'

const mapStateToProps = (state) =>({
  display:state.display.map,

  latlng:state.events.latlng,
  hasLocation:state.events.hasLocation,
  response:state.events.response,
  clickShop:state.events.clickShop,

});

const mapDispatchToProps =(dispatch)=>{
  return{
    getCurrentLocation: ()=>dispatch(getCurrentLocation()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
