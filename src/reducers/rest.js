const initialState = {
  comunication: false,
  response:[null],
  err:false,
  perPge:10,
}

export default (state = initialState, action) =>{
  switch (action.type) {
    case 'RESTSTRT':
    return{
      ...state,
      comunication:true,
      err:false,
    }
    case 'RESTSET':
    return{
      ...state,
      response:[action.data,],
      perPge:action.hit_per_page,
      add:action.add,
      err:false,
    }
    case 'RESTSET1':
    return{
      ...state,
      response:Response(state.response, action.data),
      perPge:action.hit_per_page,
      add:action.add,
      err:false,
    }
    case 'RESTERR':
      return{
        ...state,
        err:true,
      }
    case 'RESTEND':
      return{
        ...state,
        comunication:false,
      }
    default:
    return state;
  }
}

const Response =(state,data)=>{
  let a = [];
  state.forEach(value=>a.push(value));
  a.push(data)
  return a
}
