import * as MUTATIONS from './mutation-types'

const mutations = {
  [MUTATIONS.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [MUTATIONS.SET_PLAYINGSTATE] (state, flag) {
    state.playingState = flag
  },
  [MUTATIONS.SET_FULLSCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [MUTATIONS.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [MUTATIONS.SET_SEQUENCELIST] (state, list) {
    state.sequenceList = list
  },
  [MUTATIONS.SET_MODE] (state, mode) {
    state.mode = mode
  },
  [MUTATIONS.SET_CURRENTINDEX] (state, index) {
    state.currentIndex = index
  },
  [MUTATIONS.SET_TOPLIST] (state, list) {
    state.topList = list
  },
  [MUTATIONS.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  },
  [MUTATIONS.SET_PLAY_HISTORY] (state, history) {
    state.playHistory = history
  },
  [MUTATIONS.SET_FAVORITE_HISTORY] (state, history) {
    state.favoriteList = history
  }
}

export default mutations
