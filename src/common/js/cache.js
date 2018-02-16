import store from 'store'

const SEARCH_KEY = '__search_history__'
const SEARCH_LENGTH = 20

const PLAY_KEY = '__play_history__'
const PLAY_LENGTH = 200

const FAVORITE_KEY = '__favorite_list__'
const FAVORITE_LENGRH = 200

function checkSearch (query) {
  // 先取出搜索历史,如果为空,设置为空数组
  let history = store.get(SEARCH_KEY)
  if (!history) {
    history = []
  }
  // 先判断参数是否存在于搜索历史中 如果存在就删除已存在元素,并将参数提前.如果不存在就将参数提前
  let index = history.findIndex((item) => {
    return item === query
  })
  if (index === -1) {
    history.unshift(query)
  } else {
    history.splice(index, 1)
    history.unshift(query)
  }
  // 再判断搜索历史长度是否超过设定的最大长度,如果超过就删除最后一个元素
  if (history.SEARCH_LENGTH > SEARCH_LENGTH) {
    history.pop()
  }
  return history
}

function checkPlay (song) {
  let history = store.get(PLAY_KEY)
  if (!history) {
    history = []
  }
  let index = history.findIndex((item) => {
    return item.id === song.id
  })
  if (index === -1) {
    history.unshift(song)
  } else {
    history.splice(index, 1)
    history.unshift(song)
  }
  if (history.PLAY_LENGTH > PLAY_LENGTH) {
    history.pop()
  }
  return history
}

function checkFavorite (song) {
  let history = store.get(FAVORITE_KEY)
  if (!history) {
    history = []
  }
  let index = history.findIndex((item) => {
    return item.id === song.id
  })
  if (index === -1) {
    history.unshift(song)
  } else {
    history.splice(index, 1)
    history.unshift(song)
  }
  if (history.FAVORITE_LENGRH > FAVORITE_LENGRH) {
    history.pop()
  }
  return history
}

export function getSearchHistory () {
  let result = store.get(SEARCH_KEY)
  if (!result) {
    result = []
  }
  return result
}

export function getPlayHistory () {
  let result = store.get(PLAY_KEY)
  if (!result) {
    result = []
  }
  return result
}

export function getFavoriteList () {
  let result = store.get(FAVORITE_KEY)
  if (!result) {
    result = []
  }
  return result
}

export function setSearchHistory (query) {
  let history = checkSearch(query)
  store.set(SEARCH_KEY, history)
  return history
}

export function setPlayHistory (song) {
  let history = checkPlay(song)
  store.set(PLAY_KEY, history)
  return history
}

export function setFavoriteList (song) {
  let history = checkFavorite(song)
  store.set(FAVORITE_KEY, history)
  return history
}

export function deleteOneHistory (query) {
  let history = store.get(SEARCH_KEY)
  let index = history.findIndex((item) => {
    return item === query
  })
  history.splice(index, 1)
  store.set(SEARCH_KEY, history)
  return history
}

export function deleteOneFavorite (song) {
  let history = store.get(FAVORITE_KEY)
  let index = history.findIndex((item) => {
    return item.id === song.id
  })
  history.splice(index, 1)
  store.set(FAVORITE_KEY, history)
  return history
}

export function emptyHistory (query) {
  let history = []
  store.set(SEARCH_KEY, history)
  return []
}
