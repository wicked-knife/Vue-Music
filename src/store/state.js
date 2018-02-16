import {playMode} from './config'
import {getSearchHistory, getPlayHistory, getFavoriteList} from '../common/js/cache'

const state = {
  singer: {},
  playingState: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  topList: [],
  searchHistory: getSearchHistory(),
  playHistory: getPlayHistory(),
  favoriteList: getFavoriteList()
}
export default state
