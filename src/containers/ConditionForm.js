import {connect} from 'react-redux';
import ConditionForm from '../components/ConditionForm'
import {RestGet} from '../actions/Map'
import {FormExpansion, Default} from '../actions/display'

const mapStateToProps = (state) =>({
  display:state.display.form,

  //カテゴリーS
  categoryS:state.categoryS.data,
  categorySC:state.categoryS.comunication,
  categorySE:state.categoryS.err,

  //カテゴリL
  categoryL:state.categoryL.data,
  categoryLC:state.categoryL.comunication,
  categoryLE:state.categoryL.err,

  //現在地
  lat:state.events.latlng.lat,
  lng:state.events.latlng.lng,

});

const mapDispatchToProps =(dispatch)=>{
  return{
    send: (index, add)=>dispatch(RestGet(index, add)),
    FormExpansion:()=>dispatch(FormExpansion()),
    Default:()=>dispatch(Default()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionForm);
