import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
const API_URL ='https://api.gnavi.co.jp/RestSearchAPI/20150630/';
const APP_ID = '1094f71471f7d8e223c87afa7a730e74';

//現在地の取得
const lolo =()=>{
  var watchID;
  let lat;
  var lng;
  var geoOptions = {
    maximumAge : 0 ,
    timeout : 3000 ,
    enableHighAccuracy : true
  };
  var WAIT = 2000;
  return new Promise(function(resolve){
    watchID = navigator.geolocation.watchPosition( onSuccess , onErr , geoOptions );
    setTimeout(()=>{resolve(fn())},WAIT);
  })
  function fn(){
    navigator.geolocation.clearWatch( watchID );
    return{
      type:"SETCURRNTLOCATION",
      payload:{
        lat:lat,
        lng:lng,
      }
    };
  }
  function onSuccess( pos ){
    lat = pos.coords.latitude ;
    lng = pos.coords.longitude ;
  }
  function onErr( err ){
    // エラー処理
  }
}
const receiveData = (response)=>({
  type:'RECEIVE_DATA',
  name:response

})
export function ChangePage(index, range){
  return async(dispatch)=>{
    try{
      const a = await lolo();
      dispatch({type:a.type, payload:a.payload})
      const queryString = await qs.stringify({
        keyid:APP_ID,
        format:"json",
        latitude:a.payload.lat-0.003225,
        longitude:a.payload.lng+0.002801,
        range:range,
        offset_page:index
      });
      const responce = await fetchJsonp(`${API_URL}?${queryString}`);
      const data = await responce.json();
      dispatch(receiveData(data))
    }catch(e){
      dispatch(receiveData(e))

    }
  }
}
export function getCurrentLocation(){
  return async(dispatch)=>{
    try{
      const a = await lolo();
      dispatch({type:a.type, payload:a.payload})
      const queryString = await qs.stringify({
        keyid:APP_ID,
        format:"json",
        latitude:a.payload.lat-0.003225,
        longitude:a.payload.lng+0.002801,
        range:1
      });
      const responce = await fetchJsonp(`${API_URL}?${queryString}`);
      const data = await responce.json();
      dispatch(receiveData(data))
    }catch(e){
      dispatch(receiveData(e))
    }
  }
}
