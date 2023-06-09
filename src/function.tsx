const convertText = (text : string,number : number) => {
    let result : string = text
    if(text.length > number) {
       result = text.slice(0,number) + ' ...'
    }
    return result
}
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
const numberToArray = (number : number) => {
  const result : number[] = []
  for(let i = 0; i < number ; i++) {
    result.push(i + 1)
  }
  return result
}
export {convertText,VND,numberToArray}