import {playMode} from '@/store/config'
import {shuffle} from '@/common/js/utils'
import {mapGetters, mapMutations, mapActions} from 'vuex'
// 解决mini播放器在底部遮挡问题
export const playlistMixin = {
  computed: {
    ...mapGetters(['playlist'])
  },
  mounted () {
    this.handlePlaylist(this.playlist)
  },
  activated () {
    this.handlePlaylist(this.playlist)
  },
  methods: {
    handlePlaylist () {
    }
  },
  watch: {
    playlist (newval, oldval) {
      this.handlePlaylist(newval)
    }
  }
}
// 抽象出切换播放模式的js逻辑

export const randomPlay = {
  computed: {
    ...mapGetters([
      'currentSong',
      'currentIndex',
      'mode',
      'sequenceList'
    ])
  },
  methods: {
    ...mapMutations({
      SET_PLAYLIST: 'SET_PLAYLIST',
      SET_CURRENTINDEX: 'SET_CURRENTINDEX',
      SET_MODE: 'SET_MODE'
    }),
    changeMode () {
      let mode = (this.mode + 1) % 3
      this.SET_MODE(mode)
      let list = []
      if (this.mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.SET_PLAYLIST(list)
    },
    resetCurrentIndex (list) {
      let index = list.findIndex((song) => {
        return song.id === this.currentSong.id
      })
      this.SET_CURRENTINDEX(index)
    }
  }
}

// 抽象出search-box 和 suggest 组件逻辑
export const search = {
  data () {
    return {
      query: ''
    }
  },
  methods: {
    ...mapActions(['saveSearchHistory']),
    queryChange (query) {
      this.query = query
    },
    saveSearch () {
      this.saveSearchHistory(this.query)
    }
  }
}
// 抽象出搜索历史js逻辑
export const searchList = {
  methods: {
    ...mapActions(['deleteFromHistory']),
    deleteOne (query) {
      this.deleteFromHistory(query)
    },
    pickHistory (query) {
      this.$refs['search'].setQuery(query)
    }
  }
}
