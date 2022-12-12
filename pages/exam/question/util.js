import { EST_Multiple_Choice } from '../const'
export function getAnswerType(answer, type) {
  if (type === EST_Multiple_Choice) {
    return answer ? answer.split('') : []
  } 
  return answer ?? ''
}
export function toStringFun(value, type) {
  if (type === EST_Multiple_Choice) {
    return value ? value.join('').replace(/,/g, '') : ''
  } 
  return value
}
     

export function curSelectList(curSelect, data) {
  return data.map(select => {
    return {
      ...select,
      checked: Array.isArray(curSelect) ? curSelect.includes(select.key) ? true : false : curSelect === select.key
    }
  })
}