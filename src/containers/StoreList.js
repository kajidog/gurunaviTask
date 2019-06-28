import {connect} from 'react-redux';
import SroreList from '../components/StoreList'
import {RestGet, ClickShop} from '../actions/Map'
import {Information, Map} from '../actions/display'

const mapStateToProps = (state) =>({
  display:state.display.list,
  expansion:state.display.expansion,
  response:state.rest.response,
  comunication:state.rest.comunication,
  perPge:state.rest.perPge,
  url:state.rest.add,
  err:state.rest.err,
});

const mapDispatchToProps =(dispatch)=>{
  return{
    ChangePage: (index, add, mode)=>dispatch(RestGet(index, add, mode)),
    ClickShop:(name, lat, lng)=>dispatch(ClickShop(name, lat, lng)),
    Information:(data)=>dispatch(Information(data)),
    Map:()=>dispatch(Map()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SroreList);
