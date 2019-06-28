const initialState = {
  map:false,
  form:true,
  list:true,
  info:false,
  expansion:false
}

export default (state = initialState, action) =>{
  switch (action.type) {
    case 'FORMEXPANSION':
    return{
      ...state,
      list:false,
      map:false,
      expansion:true
    }
    case 'MAP':
    return{
      ...state,
      map:true,
    }
    case 'DEFAULT':
    return{
      ...state,
      form:true,
      map:false,
      list:true,
      info:false,
      expansion:false
    }
    case 'BACK':
    return{
      ...state,
      form:true,
      map:true,
      list:true,
      info:false,
    }
    case 'INFORMATION':
    return{
      form:false,
      map:false,
      list:false,
      info:true,

    }
    default:
    return state;
  }

}
