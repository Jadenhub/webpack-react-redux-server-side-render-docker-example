export function getData(data){
  if (Array.isArray(data)){
    return data.reduce((acc, curr, idx)=>{
      acc[curr.id] = curr;
      return acc;
    }, {})
  }
  return {
    [data.id]: data
  }
}