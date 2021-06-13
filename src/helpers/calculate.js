import BigMath from 'big.js'

export function divide(x, y, round = 2) {
  const result = new BigMath(BigMath(x).div(BigMath(y)))
  return result.round(round)
};

export function multiply(x, y){
  if(!x || !y) return;
  return BigMath(x).times(y)
};