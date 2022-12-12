import { EST_Multiple_Choice } from './const'
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