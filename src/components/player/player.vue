<template>
  <div id='player' v-if='playlist.length > 0'>
    <transition name='normal'>
      <div id="normal-player" v-show='fullScreen'>
        <h3 id='song-name' v-html='currentSong.name' @click='test'></h3>
        <h2 id='singer-name' v-html='currentSong.singer'></h2>
        <img :src="currentSong.image" id='bg-blur'>
        <i class='iconfont icon-unfold' @click.stop='minimize'></i>
        <div id='rotate-hook' v-show="cdShow" @click="toggleShow">
          <transition name='fade' mode="out-in">
            <div id='for-transition' v-show="cdShow">
              <div id="image-warpper" :class='{"play":true, "stop": !playingState}'>
                <img :src="currentSong.image" id='song-image'>
              </div>
              <p id="mini-lyric">{{currentLyric}}</p>
            </div>
          </transition>
        </div>
        <div id='lyric-container' v-if='lyric.lines' v-show="!cdShow" @click="toggleShow">
          <transition name='fade'>
            <div id='lyric-scroll-warpper' v-show="!cdShow">
              <scroll :data="lyric.lines" ref='lyric-scroll'>
                <div id="lyric-inner">
                  <p v-for="(line, index) in lyric.lines" :key='index' :class="{'active': index === currentLine}" class='lyric-line' ref='lyric-line'>{{line.txt}}
                  </p>
                </div>
              </scroll>
            </div>
          </transition>
        </div>

        <div id="progress-bar-warpper">
          <progress-bar v-if='currentSong.duration' :currentTime='currentTime' :totalTime='currentSong.duration' @progressChange='changeProgress'></progress-bar>
        </div>
        <audio :src="currentSong.url" ref='audio' @canplay="ready" @error="error" @timeupdate='updateTime($event)' @ended='end'></audio>
        <div id="controler-warpper">
          <i class="iconfont icon-danquxunhuan" v-show="mode === 1" @click='changeMode'></i>
          <i class="iconfont icon-liebiaoxunhuan" v-show="mode === 0" @click='changeMode'></i>
          <i class="iconfont icon-suijibofang" v-show="mode === 2" @click='changeMode'></i>
          <i class="iconfont icon-roundleftfill" @click.stop='prev' :class='{"disable":!canPlay}'></i>
          <i class="iconfont icon-playfill" v-show='!playingState' @click.stop='togglePlayingState'></i>
          <i class="iconfont icon-stop" v-show='playingState' @click.stop='togglePlayingState'></i>
          <i class="iconfont icon-roundrightfill" @click.stop='next' :class='{"disable":!canPlay}'></i>
          <i class="iconfont icon-likefill" @click.stop='toggleFavorite(currentSong)' :class='{"active": isFavorite}'></i>
        </div>
      </div>
    </transition>
    <transition name='mini'>
      <div id="mini-player" v-show='!fullScreen' @click.stop="maximize">
        <div id='mini-process' :style='{"width":percent+"%"}' v-show='currentTime'></div>
        <div id='mini-player-left'>
          <img :src="currentSong.image" id='miniplayer-image' :class='{"play":true, "stop": !playingState}'>
          <span id='miniplayer-songname'>{{currentSong.name}}</span>
          <span id='miniplayer-singername'>{{currentSong.singer}}</span>
        </div>
        <div id="mini-player-right">
          <i class="iconfont icon-playfill" @click.stop="togglePlayingState" v-show='!playingState'></i>
          <i class="iconfont icon-stop" @click.stop="togglePlayingState" v-show='playingState'></i>
          <i class="iconfont icon-swticonyinle2" @click.stop='showPlayList'></i>
        </div>
      </div>
    </transition>
    <play-list ref='play-list'></play-list>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import progressBar from '@/components/Progress-bar/Progress-bar'
import PlayList from '@/components/Play-list/Play-list'
import { playMode } from '@/store/config'
import { randomPlay } from '@/common/js/mixin'
import { getLyric } from '@/common/api/lyric'
import Lyric from 'lyric-parser'
import scroll from '@/base/scroll/scroll'
export default {
  mixins: [randomPlay],
  data () {
    return {
      canPlay: false,
      currentTime: 0,
      audio: {},
      percent: 0,
      lyric: {},
      currentLine: 0,
      cdShow: true,
      currentLyric: ''
    }
  },
  components: {
    progressBar,
    PlayList,
    scroll
  },
  computed: {
    ...mapGetters([
      'playlist',
      'fullScreen',
      'currentSong',
      'playingState',
      'currentIndex',
      'mode',
      'favoriteList'
    ]),
    isFavorite () {
      let index = this.favoriteList.findIndex(item => {
        return item.id === this.currentSong.id
      })
      if (index !== -1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions([
      'savePlayHistory',
      'deleteFromFavorite',
      'saveFavoriteHistory'
    ]),
    minimize () {
      this.SET_FULLSCREEN(false)
    },
    maximize () {
      this.SET_FULLSCREEN(true)
    },
    togglePlayingState () {
      this.SET_PLAYINGSTATE(!this.playingState)
      if (this.lyric.togglePlay) {
        this.lyric.togglePlay()
      }
    },
    test () {
      this.testShow = !this.testShow
    },
    ready () {
      this.canPlay = true
      this.savePlayHistory(this.currentSong)
    },
    error () {
      this.canPlay = true
    },
    end () {
      if (this.mode === playMode.loop) {
        this.$nextTick(() => {
          this.audio.currentTime = 0
          this.$refs.audio.play()
          if (this.lyric.seek) {
            this.lyric.seek(0)
          }
        })
      } else {
        this.$nextTick(() => {
          this.next()
        })
      }
    },
    prev () {
      if (this.canPlay) {
        let index = this.currentIndex - 1
        index < 0
          ? this.SET_CURRENTINDEX(this.playlist.length - 1)
          : this.SET_CURRENTINDEX(index)
      }
      this.canPlay = false
    },
    next () {
      if (this.canPlay) {
        let index = this.currentIndex + 1
        index === this.playlist.length
          ? this.SET_CURRENTINDEX(0)
          : this.SET_CURRENTINDEX(index)
      }
      this.canPlay = false
    },
    updateTime (event) {
      this.currentTime = event.target.currentTime
      this.percent = Math.floor(
        this.currentTime / this.currentSong.duration * 100
      )
      if (!this.audio.currentTime) {
        this.audio = event.target
      }
    },
    changeProgress (percent) {
      this.percent = percent
      let time = this.currentSong.duration
      let currentTime = time * (percent / 100)
      this.audio.currentTime = currentTime
      if (this.lyric.seek) {
        this.lyric.seek(currentTime * 1000)
      }
    },
    showPlayList () {
      this.$refs['play-list'].show()
    },
    toggleFavorite (song) {
      let index = this.favoriteList.findIndex(item => {
        return item.id === song.id
      })
      if (index === -1) {
        this.saveFavoriteHistory(song)
      } else {
        this.deleteFromFavorite(song)
      }
    },
    toggleShow () {
      this.cdShow = !this.cdShow
      if (!this.cdShow) {
        this.$refs['lyric-scroll'].refresh()
      }
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLine = lineNum
      if (this.currentLine > 5) {
        let el = this.$refs['lyric-line'][lineNum - 5]
        this.$refs['lyric-scroll'].scrollToElement(el, 1000)
      } else {
        this.$refs['lyric-scroll'].scrollToTop(1000)
      }
      this.currentLyric = txt
    },
    ...mapMutations({
      SET_FULLSCREEN: 'SET_FULLSCREEN',
      SET_PLAYINGSTATE: 'SET_PLAYINGSTATE',
      SET_CURRENTINDEX: 'SET_CURRENTINDEX',
      SET_MODE: 'SET_MODE'
    })
  },
  watch: {
    playingState (newval, oldval) {
      this.$nextTick(() => {
        let audio = this.$refs.audio
        if (this.playlist.length) {
          this.playingState ? audio.play() : audio.pause()
        }
      })
    },
    currentSong (newsong, oldsong) {
      if (this.lyric.stop) {
        this.lyric.stop()
      }
      this.$nextTick(() => {
        if (newsong.id !== oldsong.id) {
          if (!newsong.id) {
            return false
          }
          this.$refs.audio.play()
          this.SET_PLAYINGSTATE(true)
          getLyric(newsong.name)
            .then(res => {
              var lyric = res.data.lrc.lyric
              this.lyric = new Lyric(lyric, this.handleLyric)
              this.lyric.play()
            })
            .catch(() => {
              this.currentLine = 0
              this.currentLyric = ''
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#player {
  #normal-player {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
    z-index: 200;
    #bg-blur {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      filter: blur(15px) brightness(50%);
      z-index: -1;
    }
    .icon-unfold {
      color: $color-theme;
      font-size: 30px;
      position: absolute;
      left: 10px;
      top: 0;
    }
    #song-name {
      line-height: 40px;
      color: #fff;
      font-size: 18px;
      font-weight: normal;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    #singer-name {
      color: #fff;
      font-weight: 200;
      font-size: 14px;
      text-align: center;
      overflow: hidden;
    }
    #rotate-hook {
      transform: scale(1);
      #image-warpper {
        box-sizing: border-box;
        width: 100%;
        padding-top: 95%;
        &.play {
          animation: rotate 20s infinite linear;
        }
        &.stop {
          animation-play-state: paused;
        }
        #song-image {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 75%;
          width: 75%;
          border-radius: 50%;
          border: 8px solid rgba(200, 200, 200, 0.1);
          transform: translate3d(-50%, -50%, 0) scale(1);
        }
      }
      #mini-lyric {
        color: #fff;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        padding-bottom: 10px;
        width:100%;
        @include no-wrap();
      }
    }
    #lyric-container {
      box-sizing: border-box;
      width: 100%;
      padding-top: 95%;
      overflow: hidden;
      position: relative;
      padding-bottom: 26px;
      #lyric-scroll-warpper {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        #lyric-inner {
          .lyric-line {
            color: #666;
            font-size: 14px;
            line-height: 28px;
            text-align: center;
          }
        }
      }
    }
    #controler-warpper {
      display: flex;
      position: absolute;
      bottom: 10px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      i {
        flex: 1;
        color: $color-theme;
        font-size: 30px;
        text-align: center;
        &.icon-playfill,
        &.icon-stop {
          font-size: 50px;
          margin-top: -15px;
        }
        &.disable {
          color: grey !important;
        }
        &.active {
          color: $color-sub-theme;
        }
      }
    }
  }
  #mini-player {
    position: fixed;
    bottom: -1px;
    height: 60px;
    width: 100%;
    background: $color-highlight-background;
    box-sizing: border-box;
    padding: 5px 0px 5px 0;
    z-index: 200;
    display: flex;
    #mini-process {
      position: absolute;
      height: 1px;
      background: $color-theme;
      top: 0;
    }
    #mini-player-left {
      flex: 2;
      margin-right: 50px;
      margin-left: 20px;
      overflow: hidden;
      #miniplayer-image {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        float: left;
        margin-top: 3px;
        margin-right: 10px;
        animation: rotate 20s infinite linear;
        &.play {
          animation: rotate 20s infinite linear;
        }
        &.stop {
          animation-play-state: paused;
        }
      }
      #miniplayer-songname {
        display: block;
        font-size: 14px;
        color: #fff;
        margin-bottom: 5px;
        padding-top: 5px;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      #miniplayer-singername {
        font-size: 12px;
        color: $color-text-d;
      }
    }
    #mini-player-right {
      padding-top: 5px;
      padding-right: 20px;
      i {
        font-size: 30px;
        color: $color-theme;
        position: absolute;
      }
      .icon-playfill {
        right: 60px;
      }
      .icon-stop {
        font-size: 40px;
        right: 56px;
        top: 2px;
      }
      .icon-swticonyinle2 {
        font-size: 25px;
        top: 13px;
        right: 10px;
      }
    }
  }
}
.active {
  color: #fff !important;
}
.normal-enter,
.normal-leave-to {
  opacity: 0;
  #song-name {
    transform: translateY(-100px);
  }
  #singer-name {
    transform: translateY(-150px);
  }
  #controler-warpper {
    transform: translateY(100%);
  }
  .icon-unfold {
    transform: translateY(-100%);
  }
  #rotate-hook {
    transform: translate3d(-30%, 100%, 0) scale(0.1) rotate(-180deg) !important;
  }
}
.normal-enter-active,
.normal-leave-active {
  transition: all 0.5s;
  #song-name {
    transition: all 0.5s cubic-bezier(0, 1.41, 0.99, 1);
  }
  #singer-name {
    transition: all 0.5s cubic-bezier(0, 1.41, 0.99, 1);
  }
  #controler-warpper {
    transition: all 0.5s ease;
  }
  .icon-unfold {
    transition: all 0.5s ease;
  }
  #rotate-hook {
    transition: all 0.5s ease;
  }
}
.mini-enter,
.mini-leave-to {
  transform: translate3d(0, 100%, 0);
}
.mini-enter-active,
.mini-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
