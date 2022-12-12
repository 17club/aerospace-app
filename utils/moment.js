const oneDaySecond = 60 * 60 * 24

export function dateTimeFormat(time) {
  if (!time) return ''
  const t = parseDate(time)
  if (!t) return ''
  const month = (t.getMonth() + 1 + '').padStart(2, '0')
  const date = (t.getDate() + '').padStart(2, '0')
  const hour = (t.getHours() + '').padStart(2, '0')
  const minute = (t.getMinutes() + '').padStart(2, '0')
  const second = (t.getSeconds() + '').padStart(2, '0')
  return `${t.getFullYear()}-${month}-${date} ${hour}:${minute}:${second}`
}

export function dateFormatWithoutYear(time) {
  const t = dateFormat(time)
  if (!t) return t
  return t.split('-').splice(1, 2).join('-')
}

export function dateFormat(time) {
  if (!time) return ''
  const t = parseDate(time)
  if (!t) return ''
  const month = (t.getMonth() + 1 + '').padStart(2, '0')
  const date = (t.getDate() + '').padStart(2, '0')
  return `${t.getFullYear()}-${month}-${date}`
}

export function getTodayTimestampSecond() {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return parseInt(startOfDay / 1000)
}

export function getNDaysAgoTimestampSecond(diff) {
  const todayTimestampSecond = getTodayTimestampSecond()
  return todayTimestampSecond - (diff * oneDaySecond)
}

export function getNowTimestampSecond() {
  return parseInt(Date.now() / 1000)
}

function parseDate(date) {
  const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
  if (!date && date !== 0) return
  if (date instanceof Date) return new Date(date)
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE)
    if (d) {
      const m = d[2] - 1 || 0
      const ms = (d[7] || '0').substring(0, 3)
      return new Date(d[1], m, d[3]
        || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }

  let t = new Date(date)
  if (isNaN(t)) return
  return t // everything else
}
