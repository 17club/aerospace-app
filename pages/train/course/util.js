const data = {
  '0': '零',
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '七',
  '8': '八',
  '9': '九',
}
export function toZh_cn(num) {
  return String(num).split('').map(v => data[v] || v).join('')
}