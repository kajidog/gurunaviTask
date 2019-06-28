const initialState = {
  comunication:false,
  err:false,
  data:null,
}

export default (state = initialState, action) =>{
  switch (action.type) {
    case 'CATEGORYSSTART':
    return{
      ...state,
      comunication:true,
      err:false,
    }
    case 'CATEGORYSSET':
    return{
      ...state,
      data:action.data
    }
    case 'CATEGORYSERR':
    return{
      ...state,
      err:true,
    }
    case 'CATEGORYSEND':
    return{
      ...state,
      comunication:false,
    }
    default:
    return state;
  }

}
