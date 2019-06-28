import qs from 'qs';
import axios from 'axios';
const API_URL ='https://api.gnavi.co.jp/RestSearchAPI/v3/';
const CategorySmallSearchAPI = 'https://api.gnavi.co.jp/master/CategorySmallSearchAPI/v3/'
const CategoryLargeSearchAPI = 'https://api.gnavi.co.jp/master/CategoryLargeSearchAPI/v3/'
const APP_ID = '363e78b1887b75592b0650a24e1f0f20';
//const APP_ID = '1094f71471f7d8e223c87afa7a730e74';363e78b1887b75592b0650a24e1f0f20

//カテゴリーの情報取得
export const CategoryS =()=>{
  return async(dispatch)=>{
    try{
      dispatch({type:"CATEGORYSSTART"})
      const queryString = await qs.stringify({
        keyid:APP_ID,
      });
      await axios.get(`${CategorySmallSearchAPI}?${queryString}`).then(res => {
        const items = res.data;
        dispatch(Judgment("CATEGORYS", items, "category_s"))
      }).catch(error => {
        dispatch({type:"CATEGORYSERR"})
      });
    }catch(e){
      dispatch({type:"CATEGORYSERR"})
    }
    dispatch({type:"CATEGORYSEND"})
  }
}
export const CategoryL =()=>{
  return async(dispatch)=>{
    try{
      dispatch({type:"CATEGORYLSTART"})
      const queryString = await qs.stringify({
        keyid:APP_ID,
      });
      await axios.get(`${CategoryLargeSearchAPI}?${queryString}`).then(res => {
        const items = res.data;
        dispatch(Judgment("CATEGORYL", items, "category_l"))
      }).catch(error => {
        dispatch({type:"CATEGORLSERR"})
      });
    }catch(e){
      dispatch({type:"CATEGORYLERR"})
    }
    dispatch({type:"CATEGORYLEND"})
  }
}
//カテゴリーのレスポンスのerror判定
const Judgment =(type, data, key)=>{
  if(key in data){
    return {type:type+"SET", data:data}
  }
  return{type:type+"ERR"}
}

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
  var WAIT = 4000;
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
  }
}

const receiveData = (response)=>({
  type:'RECEIVE_DATA',
  response:response
})

// レストランの情報取得
export function RestGet(send, add, mode=1){
  return async(dispatch)=>{
    try{
      dispatch({type:"RESTSTRT"});
      var json = Object.assign(send, {keyid:APP_ID});
      let queryString = await qs.stringify(json);
      add.forEach(value=>queryString+=value)
      console.log(JSON.stringify(queryString));
      await axios.get(`${API_URL}?${queryString}`).then(res => {
        const items = res.data;
        let a = Judgment("REST",items, "rest")
        a["send"] = send;
        a["add"] = add;
        if(mode !== 1)a.type = 'RESTSET1'
        dispatch(a)
      }).catch(error => {
        dispatch({type:"RESTERR"})
      });
    }catch(e){
      dispatch({type:"RESTERR"})
    }
    dispatch({type:"RESTEND"})
  }
}

//現在地の取得
export function getCurrentLocation(){
  return async(dispatch)=>{
    try{
      const d =await CategoryS();
      dispatch(d)
      const e =await CategoryL();
      dispatch(e)
      let a = await lolo();
      if(typeof a === 'undefined'){
        a = await lolo();
      }
      dispatch({type:a.type, payload:a.payload})
      const queryString = await qs.stringify({
        latitude:a.payload.lat,//-0.003225,
        longitude:a.payload.lng,//+0.002801,
        range:1
      });
      const f = RestGet({hit_per_page:100}, ["&"+ queryString]);
      dispatch(f)
    }catch(e){
      dispatch(receiveData(e))
    }
  }
}
export const ClickShop = (name, lat, lng)=>{
  return({
    type:'CLICKSHOP',
    payload:{
      info:{
        name:name,
        lat:lat,
        lng:lng
      }
    }
  })
}

export const GetToRestID =(id)=>{
  return async(dispatch)=>{
    try{
      dispatch({type:"STOREINFORMATIONSTRT"});
      let queryString = await qs.stringify({
        keyid:APP_ID,
        id:id,
      });
      console.log(JSON.stringify(queryString));
      await axios.get(`${API_URL}?${queryString}`).then(res => {
        const items = res.data;
        dispatch(Judgment("STOREINFORMATION",items, "rest"))
      }).catch(error => {
        dispatch({type:"STOREINFORMATIONERR"})
      });
    }catch(e){
      dispatch({type:"STOREINFORMATIONERR"})
    }
    dispatch({type:"STOREINFORMATIONEND"})
  }
}
