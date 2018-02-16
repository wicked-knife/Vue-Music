<template>
  <div id='list'>
    <ul>
      <li v-for="(song, index) in songs" :key='index' class='song' @click='_selectSong(song, index)' ref='hook'>
        <div class="rank-icon" v-if='isRank'>
          <i class='iconfont icon-upstagefill' v-show='index < 3' :class='{"first": index === 0,"second": index === 1,"third": index === 2,}'></i>
          {{_showRank(index)}}
        </div>
        <div class='song-info'>
          <span class='song-name'>{{song.name}}</span>
          <span class='song-desc'>{{`${song.singer}·${song.album}`}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {},
    isRank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _selectSong (song, index) {
      this.$emit('select', song, index)
    },
    _showRank (index) {
      if (this.isRank && index >= 3) {
        return index + 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#list {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px;
  background-color: $color-background;
  .song {
    line-height: 20px;
    font-size: 14px;
    width: 100%;
    display: flex;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    .rank-icon {
      flex: 0 0 40px;
      width: 40px;
      height: 43px;
      font-size: 18px;
      color: $color-theme;
      line-height: 43px;
      vertical-align: middle;
      .icon-upstagefill {
        font-size: 30px;
        margin-left: -10px;
        &.first {
          color: rgb(255, 211, 50) !important;
        }
        &.second {
          color: rgb(201, 201, 201) !important;
        }
        &.third {
          color: rgb(253, 182, 20) !important;
        }
      }
    }
    .song-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .song-name {
        color: #fff;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .song-desc {
        color: $color-text-d;
        margin-top: 3px;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
