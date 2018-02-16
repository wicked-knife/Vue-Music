<template>
  <div id="process-bar">
    <span id='current-time'>{{_formatTime(currentTime)}}</span>
    <div id="bar" @click.stop.prevent='_clickSetPercent($event)' ref='bar'>
      <div id="progress" :style='{"width":percent+"%"}'>
        <div id='ball' :style='{"left":percent+"%"}' ref='ball' @touchmove='_slideSetPercent($event)' @touchend='touchend'>
          <div id="ball-spot"></div>
        </div>
      </div>
    </div>
    <span id='total-time'>{{_formatTime(totalTime)}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      percent: {
        type: Number,
        default: 0
      },
      isMove: false
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    totalTime: {
      type: Number,
      default: 0
    }
  },
  methods: {
    _formatTime (time) {
      let min = this._pad(Math.floor(time / 60), 2)
      let sec = this._pad(Math.floor(time % 60), 2)
      return `${min}:${sec}`
    },
    _pad (num, len) {
      let length = num.toString().length
      while (length < len) {
        num = '0' + num
        length++
      }
      return num
    },
    _clickSetPercent (event) {
      let clickLeft = event.pageX
      this._calcPercent(clickLeft)
    },
    _slideSetPercent (event) {
      let touchLeft = event.touches[0].pageX
      this.isMove = true
      this._calcPercent(touchLeft)
    },
    _autoUpdatePercent () {
      if (!this.isMove) {
        this.percent = Math.floor((this.currentTime / this.totalTime) * 100)
      }
    },
    _calcPercent (left) {
      let offsetLeft = this.$refs['bar'].offsetLeft
      let X = left - offsetLeft
      let length = this.$refs['bar'].clientWidth
      let percent = Math.floor((X / length) * 100)
      percent > 100 ? percent = 100 : percent = percent + 0
      percent < 0 ? percent = 0 : percent = percent + 0
      this.percent = percent
      if (!this.isMove) {
        this.$emit('progressChange', this.percent)
      }
    },
    touchend () {
      this.isMove = false
      this.$emit('progressChange', this.percent)
    }
  },
  watch: {
    currentTime () {
      this._autoUpdatePercent()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/style/variable.scss';
#process-bar{
  color: #fff;
  display: flex;
  padding: 0 40px;
  align-items: center;
  #bar{
    flex:1;
    width: 100%;
    height: 5px;
    background-color: $color-background-d;
    position: relative;
    #progress{
      display: flex;
      align-items: center;
      height: 5px;
      background-color:$color-theme;
      #ball{
        width: 16px;height: 16px;
        border-radius: 50%;
        background-color: #fff;
        box-sizing: border-box;
        padding:3px;
        position: absolute;
        transform: translateX(-8px);
        #ball-spot{
          width: 10px;height: 10px;
          border-radius: 50%;
          background-color: $color-theme;
        }
      }
    }
  }
  #current-time{
    margin-right: 8px;
  }
  #total-time{
    margin-left: 8px;
  }
}
</style>
