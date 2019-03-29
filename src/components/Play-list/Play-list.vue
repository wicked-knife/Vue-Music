<template>
  <transition name='up'>
    <div id='play-list' v-show='isShow' @click.stop='hide'>
      <div id='play-list-warpper' @click.stop>
        <div id='play-list-top'>
          <div id='top-left'>
            <i class="iconfont icon-suijibofang" v-show='mode === 2' @click.stop='changeMode'></i>
            <span v-show='mode === 2'>随机播放</span>
            <i class="iconfont icon-liebiaoxunhuan" v-show='mode === 0' @click.stop='changeMode'></i>
            <span v-show='mode === 0'>顺序播放</span>
            <i class="iconfont icon-danquxunhuan" v-show='mode === 1' @click.stop='changeMode'></i>
            <span v-show='mode === 1'>单曲循环</span>
          </div>
          <div id="top-right">
            <i class='iconfont icon-delete' @click.stop='showConfirm'></i>
          </div>
        </div>
        <div id="play-list-middle">
          <scroll :data='sequenceList' ref='scroll'>
            <transition-group tag='ul' name='list' v-if='sequenceList.length'>
              <li v-for='(song, index) in sequenceList' :key='song.id'  class='play-list-item' @click='selectSong(song, index)' ref='play-list-item'>
                <div class='item-left'>
                  <i class='iconfont icon-video' :class='{"active": currentSong.id === song.id}'></i>
                  <span>{{song.name}}</span>
                </div>
                <div class='item-right'>
                  <i class='iconfont icon-likefill' @click.stop='toggleFavorite(song)' :class='{"active": isFavorite(song)}'></i>
                  <i class='iconfont icon-close' @click.stop='deleteOne(song)'></i>
                </div>
              </li>
            </transition-group>
          </scroll>
        </div>
        <div id='add-to-list' @click='showAddList'>
          <span>添加歌曲到队列</span>
        </div>
        <div id="play-list-bottom" @click.stop='hide'>
          <span>关闭</span>
        </div>
        <add-list ref='add-list'></add-list>
        <Confirm title="是否清空当前歌单" v-model="confirmShow" @on-cancel="onCancel" @on-confirm="onConfirm" @click.stop></Confirm>
      </div>
    </div>
  </transition>

</template>

<script>
// import { playMode } from '@/store/config'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import scroll from '@/base/scroll/scroll'
import AddList from '@/components/Add-list/Add-list'
import { playMode } from '@/store/config'
import { Confirm } from 'vux'
import {randomPlay} from '@/common/js/mixin'
export default {
  mixins: [randomPlay],
  data () {
    return {
      isShow: false,
      confirmShow: false
    }
  },
  methods: {
    ...mapMutations({
      SET_CURRENTINDEX: 'SET_CURRENTINDEX'
    }),
    ...mapActions(['deleteSong', 'emptyPlayList', 'saveFavoriteHistory', 'deleteFromFavorite']),
    hide () {
      this.isShow = false
    },
    show () {
      this.isShow = true
      setTimeout(() => {
        this.$refs['scroll'].refresh()
      }, 20)
    },
    onConfirm () {
      this.emptyPlayList()
    },
    showConfirm () {
      this.confirmShow = true
    },
    onCancel () {
      this.confirmShow = false
    },
    selectSong (song, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex(item => {
          return item.id === song.id
        })
      }
      this.SET_CURRENTINDEX(index)
      this.scrollToCurrent(song)
    },
    toggleFavorite (song) {
      let index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      if (index === -1) {
        this.saveFavoriteHistory(song)
      } else {
        this.deleteFromFavorite(song)
      }
    },
    scrollToCurrent (current) {
      const index = this.sequenceList.findIndex(item => {
        return current.id === item.id
      })
      this.$refs['scroll'].scrollToElement(
        this.$refs['play-list-item'][index],
        300
      )
    },
    deleteOne (song) {
      this.deleteSong(song)
    },
    showAddList () {
      this.$refs['add-list'].show()
    },
    isFavorite (song) {
      let index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      if (index !== -1) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    ...mapGetters(['mode', 'sequenceList', 'playlist', 'currentSong', 'favoriteList'])
  },
  components: {
    scroll,
    Confirm,
    AddList
  },
  watch: {
    isShow (newval) {
      if (newval) {
        setTimeout(() => {
          this.scrollToCurrent(this.currentSong)
        }, 20)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#play-list {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 300;
  #play-list-warpper {
    box-sizing: border-box;
    position: absolute;
    height: 430px;
    width: 100%;
    bottom: 0;
    padding-top: 10px;
    background-color: $color-highlight-background;
    #play-list-top {
      display: flex;
      padding: 0 20px;
      align-items: center;
      #top-left {
        flex: 1;
        display: flex;
        color: $color-theme;
        align-items: center;
        i {
          font-size: 30px;
        }
        span {
          margin-left: 10px;
          font-size: 14px;
        }
      }
      #top-right {
        i {
          color: $color-text-l;
          padding: 0 4px;
          font-size: 20px;
        }
      }
    }
    #play-list-middle {
      height: 275px;
      overflow: hidden;
      padding-bottom: 20px;
      box-sizing: border-box;
      .play-list-item {
        display: flex;
        padding: 0 20px;
        align-items: center;
        margin-top: 10px;
        .item-left {
          flex: 1;
          display: flex;
          align-items: center;
          i {
            font-size: 18px;
            color: $color-text-d;
            padding: 0 4px;
            &.active {
              color: $color-theme;
            }
          }
          span {
            font-size: 14px;
            color: $color-text-l;
            margin-left: 15px;
            overflow: hidden;
          }
        }
        .item-right {
          i {
            &.icon-likefill {
              color: $color-text-d;
            }
            &.active{
              color:$color-sub-theme;
            }
            font-size: 18px;
            color: $color-theme;
            font-weight: bold;
            margin-right: 0px;
            padding: 0 4px;
          }
        }
      }
    }
    #play-list-bottom {
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 50px;
      background-color: $color-background-d;
      font-size: 16px;
      color: $color-text-l;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #add-to-list{
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        color:$color-text-ll;
        font-size: 14px;
        padding:5px 10px;
        border-radius: 20px;
        border: solid 1px $color-text-ll;
      }
    }
  }
}
.up-enter,
.up-leave-to {
  transform: translateY(100%);
}
.up-enter-active,
.up-leave-active {
  transition: all 0.4s;
}
.list-enter,
.list-leave-to {
  transform: translateX(100%);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}
</style>
