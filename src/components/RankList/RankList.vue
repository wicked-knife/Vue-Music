<template>
  <transition name='slide'>
    <div id='rankList' v-if='topList.length > 0'>
      <i class='iconfont icon-back' @click='goBack'></i>
      <div id='bgImg' :style="bgImg" ref='bg-img'>
        <div id='mask'>
          <div id='randomPlayAll' @click.stop='randomPlayAll'>
            <i class='iconfont icon-playfill'></i>
            <span>随机播放全部</span>
          </div>
        </div>
      </div>
      <div id="list"  ref='list'>
        <Scroll :listen='true' ref='scroll'>
          <list :songs='topList' v-if='topList.length > 0' :isRank='true' @select='select'></list>
        </Scroll>
      </div>
      <loading v-show='!topList.length > 0'></loading>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MusicList from '@/components/Music-List/Music-List'
import Scroll from '@/base/scroll/scroll'
import loading from '@/base/loading/loading'
import list from '@/base/list/list'
import { playlistMixin } from '@/common/js/mixin'
export default {
  mixins: [playlistMixin],
  props: {
    rankList: {}
  },
  data () {
    return {
      songs: []
    }
  },
  methods: {
    ...mapActions(['randomPlay', 'selectPlay']),
    goBack () {
      this.$router.back()
    },
    _setHeight () {
      this.imgHeight = this.$refs['bg-img'].clientHeight
      this.listHeight =
        document.documentElement.clientHeight -
        this.$refs['bg-img'].clientHeight
      this.$refs['list'].style.height = `${this.listHeight}px`
    },
    randomPlayAll () {
      this.randomPlay({list: this.topList})
    },
    select (song, index) {
      let self = this
      this.selectPlay({
        list: self.topList,
        index
      })
    },
    handlePlaylist () {
      let bottom
      this.playlist.length > 0 ? bottom = '60px' : bottom = ''
      // setTimeout(() => {
      //   this.$refs['list'].style.paddingBottom = bottom
      //   this.$refs.scroll.refresh()
      // }, 500)
      this.$nextTick(() => {
        this.$refs['list'].style.paddingBottom = bottom
        this.$refs.scroll.refresh()
      })
    }
  },
  computed: {
    ...mapGetters(['topList']),
    bgImg () {
      return `background: url('${this.rankList.picUrl}') no-repeat;
              backgroundSize: 100% 100%`
    }
  },
  mounted () {
    if (!this.topList.length) {
      this.$router.back()
      return false
    } else {
      this._setHeight()
    }
  },
  components: {
    MusicList,
    Scroll,
    loading,
    list
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/variable.scss";
#rankList {
  position: fixed;
  height: 100%;
  background-color: $color-background;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  .icon-back {
    position: absolute;
    font-size: 30px;
    z-index: 5;
    color: $color-theme;
  }
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
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
</style>
