<template>
  <div>
    <div id='singer' ref='singer'>
      <scroll ref='scroll' :listen='true' @scroll='scroll'>
        <ul v-if='fixedSingerlist.length > 0'>
          <li v-for='(group, index) in fixedSingerlist' :key='index' class='singer-group' ref='scroll-hook'>
            <h3 class='group-name'>{{group.title}}</h3>
            <ul v-if='group'>
              <li  v-for='(singer, index) in group.items' :key='index' class='singer' @click='selectSinger(singer)'>
                <img v-lazy="singer.avatar" class='singer-avatar'>
                <span class='singer-name'>{{singer.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
      <div id='shortcut-list-warpper' ref='shortcut-hook'>
        <ul id='shortcut-list' v-if='shortcutList.length'>
          <li v-for='(char, index) in shortcutList' :key='index'  class='shortcut' @click.stop='_clickScrollSinger($event, index)' @touchmove.stop.prevent='_moveScrollSinger($event)' :class="{'active': currentIndex === index}" ref='shortcut'>
            {{char}}
          </li>
        </ul>
      </div>
      <div id='fixed-title' v-if='singerList.length'>{{fixedSingerlist[currentIndex].title}}</div>
    </div>
    <router-view v-if='singerList.length' />
  </div>

</template>

<script>
import { getSinger } from '../../common/api/singer.js'
import scroll from '@/base/scroll/scroll'
import singerDetail from '@/components/singer-detail/singer-detail'
import { mapMutations } from 'vuex'
import { playlistMixin } from '../../common/js/mixin'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      singerList: [],
      shortcutTop: 0,
      shortcutBottom: 0,
      shortcutOffset: 0,
      currentY: 0
    }
  },
  components: {
    scroll,
    singerDetail
  },
  computed: {
    fixedSingerlist () {
      let hot = this.hotSingerlist
      let sort = this.sortedSingerlist
      sort.unshift(hot)
      return sort.filter((group, index) => {
        return group.items.length !== 0
      })
    },
    hotSingerlist () {
      let hot = {}
      hot.title = '热门'
      hot.items = []
      this.singerList
        .filter((item, index) => {
          return index < 10
        })
        .forEach((item, index) => {
          let obj = {}
          obj.name = item.Fsinger_name
          obj.avatar = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${
            item.Fsinger_mid
          }.jpg?max_age=2592000`
          obj.id = item.Fsinger_mid
          hot.items.push(obj)
        })
      return hot
    },
    sortedSingerlist () {
      let arr = []
      let type = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
      type.forEach((type, index) => {
        let obj = {}
        obj.title = type
        obj.items = []
        arr.push(obj)
      })
      this.singerList.forEach((singer, index) => {
        arr.forEach((type, index) => {
          if (singer.Findex === type.title) {
            let obj = {}
            obj.name = singer.Fsinger_name
            obj.avatar = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${
              singer.Fsinger_mid
            }.jpg?max_age=2592000`
            obj.id = singer.Fsinger_mid
            type.items.push(obj)
          }
        })
      })
      return arr
    },
    shortcutList () {
      return this.fixedSingerlist.map(type => {
        return type.title.substring(0, 1)
      })
    },
    singerListTop () {
      let arr = [0]
      let height = 0
      this.$nextTick(() => {
        this.$refs['scroll-hook'].forEach((item, index) => {
          height += item.clientHeight
          arr.push(height)
        })
      })
      return arr
    },
    currentIndex () {
      let index = 0
      let currentY = this.currentY
      if (!this.shortcutOffset) {
        index = 0
      } else {
        let delta = this.shortcutOffset - this.shortcutTop
        index = Math.floor(delta / 18)
      }
      for (let i = 0; i < this.singerListTop.length - 1; i++) {
        if (
          currentY < this.singerListTop[i + 1] &&
          currentY > this.singerListTop[i]
        ) {
          index = i
        }
      }
      if (currentY === 0) {
        index = 0
      }
      return index
    }
  },
  created () {
    this._getSinger()
  },
  mounted () {
    this.$nextTick(() => {
      this.shortcutTop = this.$refs['shortcut-hook'].offsetTop
      setTimeout(() => {
        this.shortcutBottom =
          this.$refs['shortcut-hook'].clientHeight +
          this.$refs['shortcut-hook'].offsetTop
      }, 500)
    })
  },
  methods: {
    _getSinger () {
      getSinger().then(data => {
        this.singerList = data.data.list
      })
    },
    _moveScrollSinger (event) {
      let _this = this
      let offset = event.touches[0].pageY
      if (offset < this.shortcutTop) {
        offset = this.shortcutTop
      } else if (offset > this.shortcutBottom - 10) {
        offset = this.shortcutBottom - 10
      }
      this.shortcutOffset = offset
      this.$refs['scroll'].scrollToElement(
        _this.$refs['scroll-hook'][_this.currentIndex]
      )
    },
    _clickScrollSinger (event, index) {
      let _this = this
      this.shortcutOffset = event.pageY
      this.$refs['scroll'].scrollToElement(_this.$refs['scroll-hook'][index], 300)
    },
    scroll (positon) {
      this.currentY = Math.abs(Math.floor(positon.y))
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    handlePlaylist () {
      let bottom
      let top
      this.playlist.length > 0 ? (bottom = '60px') : (bottom = '')
      this.playlist.length > 0 ? (top = '-30px') : (top = '0px')
      this.$refs.singer.style.bottom = bottom
      this.$refs['shortcut-hook'].style['margin-top'] = top
      this.shortcutTop = this.$refs['shortcut-hook'].offsetTop
      this.shortcutBottom =
        this.$refs['shortcut-hook'].clientHeight +
        this.$refs['shortcut-hook'].offsetTop
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#singer {
  position: fixed;
  top: 87px;
  bottom: 0;
  width: 100%;
  z-index: -1;
  .singer-group {
    .group-name {
      height: 30px;
      background-color: $color-highlight-background;
      line-height: 30px;
      font-size: 14px;
      color: $color-text-l;
      font-weight: normal;
      padding-left: 20px;
    }
    .singer {
      display: flex;
      padding-top: 20px;
      padding-left: 30px;
      padding-bottom: 20px;
      .singer-avatar {
        flex: 0 0 50px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .singer-name {
        flex: 1;
        color: $color-text-l;
        font-size: 14px;
        line-height: 50px;
        padding-left: 20px;
      }
    }
  }
  #shortcut-list-warpper {
    position: fixed;
    right: 10px;
    top: calc(50% - 163px);
    z-index: 100;
    #shortcut-list {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      .shortcut {
        font-size: 12px;
        text-align: center;
        color: $color-text-l;
        padding: 0 4px;
        &.active {
          color: $color-theme;
        }
      }
    }
  }
  #fixed-title {
    position: absolute;
    top: -1px;
    height: 30px;
    width: 100%;
    background-color: $color-highlight-background;
    line-height: 30px;
    font-size: 14px;
    color: $color-text-l;
    font-weight: normal;
    padding-left: 20px;
  }
}
</style>
