<template>
  <transition name='slide'>
    <div id='user-center' ref='user-center'>
      <i class='iconfont icon-back' @click.stop="back"></i>
      <switches :switches='switches' :currentIndex='currentIndex' @switch='switched'></switches>
      <div id='random-play-all' @click='randomPlayALL'>
        <span>
          <i class='iconfont icon-video'></i>随机播放全部</span>
      </div>
      <div id='favoriteList' v-show='currentIndex === 0'>
        <div id="no-result-warpper" v-show='!favoriteList.length'>
          <no-result text='你还没有收藏歌曲'></no-result>
        </div>
        <scroll :data='currentIndex' ref='FavoriteList-scroll' name='play'>
          <list :songs='favoriteList' @select='selectPlay'></list>
        </scroll>
      </div>
      <div id='playHistory' v-show='currentIndex === 1'>
        <div id="no-result-warpper" v-show='!playHistory.length'>
          <no-result text='你还没有听过歌曲'></no-result>
        </div>
        <scroll :data='playHistory' ref='scroll' name='search'>
          <list :songs='playHistory' @select='selectPlay'></list>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import switches from '@/base/switches/switches'
import { mapGetters, mapActions } from 'vuex'
import scroll from '@/base/scroll/scroll'
import list from '@/base/list/list'
import NoResult from '@/base/no-result/no-result'
import {playlistMixin} from '../../common/js/mixin'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      switches: ['我喜欢的', '最近听的'],
      currentIndex: 0
    }
  },
  methods: {
    ...mapActions(['insertSong', 'randomPlay']),
    switched (index) {
      this.currentIndex = index
      if (this.$refs['scroll']) {
        setTimeout(() => {
          this.$refs['scroll'].refresh()
        }, 20)
      }
    },
    back () {
      // 优化动画
      this.$nextTick(() => {
        this.$router.back()
      })
    },
    selectPlay (song, index) {
      this.insertSong(song)
    },
    randomPlayALL () {
      switch (this.currentIndex) {
        case 0:
          if (this.favoriteList.length) {
            this.randomPlay({list: this.favoriteList})
          }
          break
        case 1:
          if (this.playHistory.length) {
            this.randomPlay({list: this.playHistory})
          }
          break
      }
    },
    handlePlaylist () {
      let bottom
      this.playlist.length ? bottom = '60px' : bottom = ''
      this.$refs['user-center'].style['bottom'] = bottom
    }
  },
  components: {
    switches,
    scroll,
    list,
    NoResult
  },
  computed: {
    ...mapGetters(['favoriteList', 'playHistory'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#user-center {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-background;
  padding-top: 10px;
  z-index: 200;
  .icon-back {
    position: absolute;
    color: $color-theme;
    font-size: 30px;
    left: 0;
    top: 0;
  }
  #random-play-all {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    margin-top: 30px;
    margin-bottom: 2px;
    span {
      text-align: center;
      border-radius: 32px;
      border: 1px solid $color-text-l;
      color: $color-text-l;
      padding: 5px 20px;
      line-height: 20px;
    }
  }
  #favoriteList {
    position: absolute;
    top: 108px;
    bottom: 0;
    overflow: hidden;
    width: 100%;
  }
  #playHistory {
    position: absolute;
    top: 108px;
    bottom: 0;
    overflow: hidden;
    width: 100%;
  }
  #no-result-warpper {
    margin-top: 50%;
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
