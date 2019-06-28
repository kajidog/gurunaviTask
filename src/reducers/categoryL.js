const initialState = {
  comunication:false,
  err:false,
  data:null,
}

export default (state = initialState, action) =>{
  switch (action.type) {
    case 'CATEGORYLSTART':
    return{
      ...state,
      comunication:true,
      err:false,
    }
    case 'CATEGORYLSET':
    return{
      ...state,
      data:action.data
    }
    case 'CATEGORYSERR':
    return{
      ...state,
      err:true,
    }
    case 'CATEGORYLEND':
    return{
      ...state,
      comunication:false,
    }
    default:
    return state;
  }

}
