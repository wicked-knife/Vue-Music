<template>
  <transition name='down'>
    <div id='add-list' v-show='isShow'>
      <div id='add-list-top'>
        <span>添加歌曲到列表</span>
        <i class='iconfont icon-close' @click.stop='hide'></i>
      </div>
      <search-box ref='search' @queryChange='queryChange' :placeHolder="'搜索歌曲'" ></search-box>
      <div id='split'></div>
      <switches :switches='switches' :currentIndex='currentIndex' @switch='switched'></switches>
      <div id='playHistory' v-show='currentIndex === 0'>
        <scroll :data='currentIndex' ref='playHistory-scroll' v-if='playHistory.length' name='play'>
          <list :songs='playHistory' @select='selectPlay'></list>
        </scroll>
      </div>
      <div id='searchHistory' v-show='currentIndex === 1'>
        <scroll :data='currentIndex' ref='scroll' v-if='searchHistory.length' name='search'>
          <search-list @delete='deleteOne' @select='pickHistory'></search-list>
        </scroll>
      </div>
      <suggest :query='query' v-show='query' @select='saveSearch' :showSinger='false'></suggest>
      <top-tip ref='top-tip'>
        <div id="top-tip-warpper">
          <span><i class='iconfont icon-musicfill'></i>  1</span>首歌曲添加到播放列表
        </div>
      </top-tip>
    </div>
  </transition>

</template>

<script>
import SearchBox from '@/base/search-box/search-box'
import Suggest from '@/components/Suggest/Suggest'
import { search, searchList } from '@/common/js/mixin'
import switches from '@/base/switches/switches'
import list from '@/base/list/list'
import TopTip from '@/base/top-tip/top-tip'
import scroll from '@/base/scroll/scroll'
import SearchList from '@/base/search-list/search-list'
import { mapGetters, mapActions } from 'vuex'
export default {
  mixins: [search, searchList],
  data () {
    return {
      isShow: false,
      query: '',
      switches: ['最近播放', '搜索历史'],
      currentIndex: 0
    }
  },
  methods: {
    ...mapActions(['insertSong']),
    hide () {
      this.isShow = false
    },
    show () {
      this.isShow = true
      setTimeout(() => {
        this.$refs['playHistory-scroll'].refresh()
      }, 20)
    },
    switched (index) {
      this.currentIndex = index
    },
    selectPlay (song, index) {
      if (index !== 0) {
        this.insertSong(song)
        this.$refs['top-tip'].show()
      }
    },
    saveSearch () {
      this.saveSearchHistory(this.query)
      this.$refs['top-tip'].show()
    }
  },
  computed: {
    ...mapGetters(['playHistory', 'searchHistory'])
  },
  components: {
    SearchBox,
    Suggest,
    switches,
    list,
    scroll,
    SearchList,
    TopTip
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#add-list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-background;
  color: $color-text;
  overflow: hidden;
  #add-list-top {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 20px;
    span {
      font-size: 16px;
      flex: 1;
      text-align: center;
      padding-left: 20px;
    }
    i {
      font-size: 30px;
      padding: 0 4px;
      color: $color-theme;
    }
  }
}
#split {
  width: 100%;
  height: 15px;
}
#playHistory {
  position: absolute;
  top: 131px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  margin-top: 2px;
}
#searchHistory{
    position: absolute;
  top: 131px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px 20px;
}
#top-tip-warpper{
  font-size: 16px;
  span{
    margin-right: 10px;
    color: $color-theme;
    i{
      margin-right: 5px;
    }
  }
}
.down-enter,
.down-leave-to {
  transform: translateY(-100%);
}
.down-enter-active,
.down-leave-active {
  transition: all 0.4s;
}
</style>
