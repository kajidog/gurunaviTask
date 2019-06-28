const initialState = {
  comunication: false,
  info:null,
  err:false,
}

export default (state = initialState, action) =>{
  switch (action.type) {
    case 'INFORMATION':
    return{
      ...state,
      info:action.data,
    }
    case 'STOREINFORMATIONSTART':
    return{
      ...state,
      comunication:true,
      err:false,
    }
    case 'STOREINFORMATIONSET':
    return{
      ...state,
      info:action.data,
      err:false,
    }
    case 'STOREINFORMATIONERR':
      return{
        ...state,
        err:true,
      }
    case 'STOREINFIRMATIONEND':
      return{
        ...state,
        comunication:false,
      }
    default:
    return state;
  }

}
