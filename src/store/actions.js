import * as MUTATIONS from './mutation-types'
import {shuffle} from '../common/js/utils'
import {playMode} from './config'
import {setSearchHistory, deleteOneHistory, emptyHistory, setPlayHistory, deleteOneFavorite, setFavoriteList} from '@/common/js/cache'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
// 对象的解构赋值
export function selectPlay ({commit, state}, {list, index}) {
  commit(MUTATIONS.SET_SEQUENCELIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(MUTATIONS.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(MUTATIONS.SET_PLAYLIST, list)
  }
  commit(MUTATIONS.SET_PLAYINGSTATE, true)
  commit(MUTATIONS.SET_CURRENTINDEX, index)
  commit(MUTATIONS.SET_FULLSCREEN, true)
}

export function randomPlay ({commit, state}, {list, index}) {
  commit(MUTATIONS.SET_MODE, playMode.random)
  let _list = shuffle(list)
  commit(MUTATIONS.SET_PLAYLIST, _list)
  commit(MUTATIONS.SET_SEQUENCELIST, list)
  commit(MUTATIONS.SET_PLAYINGSTATE, true)
  commit(MUTATIONS.SET_CURRENTINDEX, 0)
  commit(MUTATIONS.SET_FULLSCREEN, true)
}

export function insertSong ({commit, state}, song) {
  let playlist = state.playlist.slice(0)
  let sequenceList = state.sequenceList.slice(0)
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表是否有待插入的歌曲,并返回其索引,没有则返回-1
  let fIndex = findIndex(playlist, song)
  // 插入歌曲,索引+1
  currentIndex++
  // 插入歌曲到索引位置
  playlist.splice(currentIndex, 0, song)
  //  如果已经包含插入歌曲
  if (fIndex > -1) {
    // 如果当前插入的索引大于列表的序号
    if (currentIndex > fIndex) {
      playlist.splice(fIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fIndex + 1, 1)
    }
  }
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fSindex = findIndex(sequenceList, song)
  sequenceList.splice(currentIndex, 0, song)
  if (fSindex > -1) {
    if (currentSIndex > fSindex) {
      sequenceList.splice(fSindex, 1)
    } else {
      sequenceList.splice(fSindex + 1, 1)
    }
  }

  commit(MUTATIONS.SET_PLAYLIST, playlist)
  commit(MUTATIONS.SET_SEQUENCELIST, sequenceList)
  commit(MUTATIONS.SET_CURRENTINDEX, currentIndex)
  commit(MUTATIONS.SET_PLAYINGSTATE, true)
  commit(MUTATIONS.SET_FULLSCREEN, true)
}

export function saveSearchHistory ({commit, state}, query) {
  let history = setSearchHistory(query)
  commit(MUTATIONS.SET_SEARCH_HISTORY, history)
}

export function savePlayHistory ({commit, state}, song) {
  let history = setPlayHistory(song)
  commit(MUTATIONS.SET_PLAY_HISTORY, history)
}

export function saveFavoriteHistory ({commit, state}, song) {
  let history = setFavoriteList(song)
  commit(MUTATIONS.SET_FAVORITE_HISTORY, history)
}

export function deleteFromFavorite ({commit, state}, song) {
  let history = deleteOneFavorite(song)
  commit(MUTATIONS.SET_FAVORITE_HISTORY, history)
}

export function deleteFromHistory ({commit, state}, query) {
  let history = deleteOneHistory(query)
  commit(MUTATIONS.SET_SEARCH_HISTORY, history)
}

export function emptySearchHistory ({commit, state}) {
  let history = emptyHistory()
  commit(MUTATIONS.SET_SEARCH_HISTORY, history)
}

export function deleteSong ({commit, state}, song) {
  let playlist = state.playlist.slice(0)
  let sequenceList = state.sequenceList.slice(0)
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  playlist.splice(pIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(MUTATIONS.SET_PLAYLIST, playlist)
  commit(MUTATIONS.SET_SEQUENCELIST, sequenceList)
  commit(MUTATIONS.SET_CURRENTINDEX, currentIndex)
  if (!playlist.length) {
    commit(MUTATIONS.SET_PLAYINGSTATE, false)
  }
  // !playlist.length ? commit(MUTATIONS.SET_PLAYINGSTATE, false) : commit(MUTATIONS.SET_PLAYINGSTATE, true)
}

export function emptyPlayList ({commit, state}) {
  commit(MUTATIONS.SET_PLAYLIST, [])
  commit(MUTATIONS.SET_SEQUENCELIST, [])
  commit(MUTATIONS.SET_CURRENTINDEX, -1)
  commit(MUTATIONS.SET_PLAYINGSTATE, false)
}
