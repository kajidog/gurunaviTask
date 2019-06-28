export const FormExpansion = ()=>{
  return({
    type:'FORMEXPANSION',
  })
}
export const Default = ()=>{
  return({
    type:'DEFAULT',
  })
}
export const Map = ()=>{
  return({
    type:'MAP',
  })
}

export const Back = ()=>{
  return({
    type:'BACK',
  })
}

export const Information = (data)=>{
  return({
    type:'INFORMATION',
    data:data,
  })
}
