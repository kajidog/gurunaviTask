const initialState = {
  hasLocation: false,
  latlng: {
    lat: 51.505,
    lng: -0.09,
  },
  value:1,
  range:1,
  response:{}
}

export default (state = initialState, action) =>{
  switch (action.type) {
    case 'SETCURRNTLOCATION':
    return{
      ...state,
      latlng:{
        lat:action.payload.lat,
        lng:action.payload.lng,
      },
    }
    case 'RECEIVE_DATA':
    return{
      ...state,
      response:action.name,
      hasLocation: true,
    }
    default:
    return state;
  }

}
