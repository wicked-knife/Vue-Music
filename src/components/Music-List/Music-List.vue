<template>
  <div id='music-list'>
    <div id='bgImg' :style="bgImg" ref='bg-img'>
      <div id='mask'>
        <div id='randomPlayAll' @click.stop='randomPlayAll'>
          <i class='iconfont icon-playfill'></i>
          <span>随机播放全部</span>
        </div>
      </div>
    </div>
    <div id='list' ref='list'>
      <Scroll :listen='true' @scroll='scroll' ref='scroll'>
        <list :songs='songs' v-if='songs.length' @select="select"></list>
      </Scroll>
      <loading v-show="!songs.length"></loading>
    </div>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import list from '@/base/list/list'
import loading from '@/base/loading/loading'
import { mapActions, mapGetters } from 'vuex'
import {playlistMixin} from '../../common/js/mixin'
export default {
  mixins: [playlistMixin],
  props: {
    singer: {},
    songs: {}
  },
  data () {
    return {
      imgHeight: 0,
      listHeight: 0
    }
  },
  computed: {
    bgImg () {
      return `background: url('${this.singer.avatar}') no-repeat;
              backgroundSize: 100%`
    },
    ...mapGetters(['playlist', 'currentIndex'])
  },
  components: {
    Scroll,
    list,
    loading
  },
  mounted () {
    this._setHeight()
  },
  methods: {
    ...mapActions(['selectPlay', 'randomPlay']),
    _setHeight () {
      this.imgHeight = this.$refs['bg-img'].clientHeight
      this.listHeight =
        document.documentElement.clientHeight -
        this.$refs['bg-img'].clientHeight
      this.$refs['list'].style.height = `${this.listHeight}px`
    },
    scroll (pos) {},
    select (song, index) {
      let self = this
      this.selectPlay({
        list: self.songs,
        index
      })
    },
    randomPlayAll () {
      this.randomPlay({ list: this.songs })
    },
    handlePlaylist () {
      let bottom
      this.playlist.length > 0 ? bottom = '60px' : bottom = ''
      this.$refs.list.style.paddingBottom = bottom
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#music-list {
  height: 100%;
  #bgImg {
    width: 100%;
    padding-top: 70%;
    position: relative;
    #randomPlayAll {
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 0px 10px;
      border: 1px solid $color-theme;
      border-radius: 32px;
      position: absolute;
      height: 32px;
      color: $color-theme;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
    #mask {
      top: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  #list {
    position: relative;
    box-sizing: border-box;
  }
}
</style>
