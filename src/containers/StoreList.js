import {connect} from 'react-redux';
import SroreList from '../components/SroreList'
import {ChangePage} from '../actions/Map'
const mapStateToProps = (state) =>({
  response:state.events.response,
  range:state.events.range,
});

const mapDispatchToProps =(dispatch)=>{
  return{
    ChangePage: (index, range=1)=>dispatch(ChangePage(index, range))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SroreList);
