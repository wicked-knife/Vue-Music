export function shuffle (list) {
  let _list = list.slice()
  for (let i = 0; i < _list.length; i++) {
    let j = getRandom(0, i)
    let t = _list[i]
    _list[i] = _list[j]
    _list[j] = t
  }
  return _list
}

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function trim (str) {
  let whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'
  for (var i = 0, len = str.length; i < len; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i)
      break
    }
  }
  for (i = str.length - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1)
      break
    }
  }
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
}
export function throttle (fn, delay) {
  var timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
