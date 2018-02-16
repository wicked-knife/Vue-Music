<template>
  <div id='suggest'>
    <scroll :pullup='true' @scrollToEnd='searchMore' ref='scroll' :data='songsResult'>
      <ul id='results' ref='results'>
        <li class='search-result' v-if='singerResult.singermid' @click='selectSinger(singerResult)'>
          <div class='singer-result'>
            <img :src="`https://y.gtimg.cn/music/photo_new/T001R68x68M000${singerResult.singermid}.jpg?max_age=2592000`" @error.once="error">
            <div class='singer-info'>
              <span>{{singerResult.singername}}</span>
              <span>{{`单曲:${singerResult.songnum} 专辑:${singerResult.albumnum}`}}</span>
            </div>
          </div>
        </li>
        <li v-for='(result, index) in songsResult' :key='index' v-if='songsResult.length' class='search-result' @click='selectSong(result)'>
          <div class="song-result">
            <i class='iconfont icon-musicfill'></i>
            <div class='song-info'>
              <h4 class='song-name' v-html="result.name"></h4>
              <span v-html="result.singer"></span>
            </div>
          </div>
        </li>
        <loading v-show='hasMore'></loading>
        <no-result v-show='!songsResult.length && !singerResult.singermid'></no-result>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { search } from '@/common/api/search'
import { createSearchSong } from '@/common/js/song'
import scroll from '@/base/scroll/scroll'
import loading from '@/base/loading/loading'
import NoResult from '@/base/no-result/no-result'
import {mapMutations, mapActions} from 'vuex'
import {playlistMixin} from '@/common/js/mixin'
const TYPE_SINGER = 'singer'
export default {
  mixins: [playlistMixin],
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      page: 1,
      singerResult: {},
      songsResult: [],
      hasMore: true
    }
  },
  methods: {
    ...mapMutations({
      SET_SINGER: 'SET_SINGER'
    }),
    ...mapActions(['insertSong']),
    search (query, page, isZhida) {
      search(query, page, isZhida).then(res => {
        this._fixResult(res.data)
        this._checkMore(res.data.song)
      })
    },
    _fixResult (data) {
      if (data.zhida && data.zhida.singerid) {
        this.singerResult = { ...data.zhida, ...{ type: TYPE_SINGER } }
        this.singerResult.avatar = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${data.zhida.singermid}.jpg?max_age=2592000`
        this.singerResult.id = data.zhida.singermid
        this.singerResult.name = data.zhida.singername
      }
      if (data.song && this.page === 1) {
        this.songsResult = createSearchSong(data.song.list)
      } else {
        this.songsResult = this.songsResult.concat(
          createSearchSong(data.song.list)
        )
      }
    },
    searchMore () {
      if (this.hasMore) {
        this.page++
        this.search(this.query, this.page, this.showSinger)
        this.$refs['scroll'].refresh()
      }
    },
    _checkMore (songs) {
      let num = songs.curpage * songs.curnum
      let total = songs.totalnum
      num >= total ? (this.hasMore = false) : (this.hasMore = true)
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/search/${singer.id}`
      })
      this.SET_SINGER(singer)
      this.$emit('select')
    },
    selectSong (song) {
      this.insertSong(song)
      this.$emit('select')
    },
    handlePlaylist () {
      let bottom
      this.playlist.length > 0 ? bottom = '120px' : bottom = ''
      this.$refs['results'].style['padding-bottom'] = bottom
    },
    error (event) {
      let url = 'http://i1.bvimg.com/632724/22494de513217ef3.jpg'
      event.target.setAttribute('src', url)
    }
  },
  watch: {
    query (newval, oldval) {
      this.page = 1
      this.singerResult = {}
      this.search(newval, this.page, this.showSinger)
    }
  },
  components: {
    scroll,
    loading,
    NoResult
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#suggest {
  position: relative;
  top: 0;
  bottom: 0;
  height: 100%;
  padding: 0 20px;
  overflow: hidden;
  background-color: $color-background;
  .search-result {
    background-color: $color-highlight-background;
    border-radius: 5px;
    margin-top: 10px;
    padding: 5px 10px;
    .singer-result {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .singer-info {
        span {
          display: block;
          &:first-child {
            font-size: 14px;
            color: $color-text-ll;
          }
          &:last-child {
            font-size: 13px;
            color: $color-text-d;
          }
        }
      }
    }
    .song-result {
      display: flex;
      align-items: center;
      i {
        flex: 0 0 30px;
        width: 30px;
        font-size: 30px;
        color: $color-text-d;
        margin-right: 10px;
      }
      .song-info {
        h4 {
          font-size: 14px;
          color: $color-text-ll;
          font-weight: 200;
        }
        span {
          font-size: 13px;
          color: $color-text-d;
        }
      }
    }
    #loading-warpper {
      position: relative;
    }
  }
}
#results {
  padding-bottom: 50px;
}
</style>
