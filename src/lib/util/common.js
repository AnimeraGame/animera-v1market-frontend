const csvToArray = (str, delimiter = ',') => {
  // eslint-disable-next-line lodash/prefer-lodash-method
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter)
  // eslint-disable-next-line lodash/prefer-lodash-method
  const rows = str.slice(str.indexOf('\n') + 1).split('\n')
  const arr = rows.map(row => {
    // eslint-disable-next-line lodash/prefer-lodash-method
    const values = row.split(delimiter)
    const el = headers.reduce(function (object, header, index) {
      // eslint-disable-next-line lodash/prefer-lodash-method
      if (!header.includes('attributes_json')) {
        object[header] = values[index]
      } else {
        object[header] = [values[index], ...values.slice(index, values.length)].join(',')
      }
      return object
    }, {})
    return el
  })

  return { arr, headers }
}

export const pad = (num, size) => {
  const s = '000000000' + num
  return s.substr(s.length - size)
}

export const getOrdinalNum = number => {
  let selector

  if (number <= 0) {
    selector = 4
  } else if ((number > 3 && number < 21) || number % 10 > 3) {
    selector = 0
  } else {
    selector = number % 10
  }

  return number + ['th', 'st', 'nd', 'rd', ''][selector]
}

export const objectSwap = json => {
  const ret = {}
  for (const key in json) {
    ret[json[key]] = key
  }
  return ret
}

export const msToTime = ms => {
  // 1- Convert to seconds:
  let seconds = ms / 1000
  // 2- Extract hours:
  const hours = parseInt(seconds / 3600) // 3,600 seconds in 1 hour
  seconds = seconds % 3600 // seconds remaining after extracting hours
  // 3- Extract minutes:
  const minutes = parseInt(seconds / 60) // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = Math.floor(seconds % 60)

  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
}

const csvKeys = [
  'file',
  'name',
  'description',
  'quantity',
  'chain',
  'price',
  'auction',
  'price_currency',
  'drop_datetime_utc',
  'royalties',
  'exclusive_content',
  'price_reserve',
  'file_backup1',
  'file_backup2',
  'attributes_json',
]

export const getIcon = suit => {
  switch (suit) {
    case 'Spades':
      return '♠'
    case 'Hearts':
      return '♥'
    case 'Diamonds':
      return '♦'
    case 'Clubs':
      return '♣'
    case 'S':
      return '♠'
    case 'H':
      return '♥'
    case 'D':
      return '♦'
    case 'C':
      return '♣'
  }
}

export const getImageIcon = suit => {
  switch (suit) {
    case 's':
      return '♠'
    case 'h':
      return '♥'
    case 'd':
      return '♦'
    case 'c':
      return '♣'
  }
}

export const getRarity = d => {
  switch (d) {
    case 3:
      return 'Common'
    case 2:
      return 'Rare'
    case 1:
      return 'Legendary'
    case 4:
      return 'Wild'
    case 0:
      return 'All'
    default:
      return 'Common'
  }
}

export default { csvToArray, csvKeys }
