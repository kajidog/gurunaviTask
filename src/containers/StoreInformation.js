import {connect} from 'react-redux';
import SroreList from '../components/StoreInformation'
import {GetToRestID} from '../actions/Map'
import {Back} from '../actions/display'

const mapStateToProps = (state) =>{
  return {
    display:state.display.info,
    data:state.storeInformation.info,

  };
}

const mapDispatchToProps =(dispatch)=>{
  return{
    GetToRestID:(id)=>dispatch(GetToRestID(id)),
    Default:()=>dispatch(Back()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SroreList);
