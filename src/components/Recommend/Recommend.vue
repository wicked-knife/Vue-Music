<template>
  <div id="recommend" ref='recommend'>
    <scroll>
    <div id="recommend-content">
      <Swiper :list='_swiperData' v-if="recommendData.slider" :aspect-ratio='200/500' :dots-position="'center'" :auto='true' :loop='true'></Swiper>
      <div id="recommend-songlist">
        <h3>热门歌单推荐</h3>
        <ul>
          <li class="songlist-item" v-if="recommendData.songList.length" v-for="(song, index) in recommendData.songList" :key="index" @click.stop.prevent='jump(song)'>
            <img v-lazy="song.picUrl" class="songlist-img">
            <div class="songlist-info">
              <span class="songlist-author">{{song.songListAuthor}}</span>
              <span class="songlist-desc">{{song.songListDesc}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <loading v-show='!recommendData.songList'></loading>
    </scroll>
  </div>
</template>

<script>
import { getRecommend } from '../../common/api/recommmend'
// import { getPCrecommend } from '../../common/api/PCrecommend'
import { Swiper, SwiperItem } from 'vux'
import scroll from '@/base/scroll/scroll'
import loading from '@/base/loading/loading'
import {playlistMixin} from '../../common/js/mixin'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      recommendData: {}
    }
  },
  computed: {
    _swiperData () {
      let arr = []
      this.recommendData.slider.forEach((item, index) => {
        let obj = {}
        obj.url = item.linkUrl
        obj.img = item.picUrl
        arr.push(obj)
      })
      return arr
    }
  },
  created () {
    this._getRecommend()
  },
  components: {
    Swiper,
    SwiperItem,
    scroll,
    loading
  },
  methods: {
    _getRecommend () {
      getRecommend().then(data => {
        this.recommendData = data.data
      })
    },
    handlePlaylist () {
      let bottom
      this.playlist.length > 0 ? bottom = '60px' : bottom = ''
      this.$refs.recommend.style.bottom = bottom
    },
    jump (song) {
      let url = `https://y.qq.com/w/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id=${song.id}`
      window.open(url)
    }
  }
  // mounted () {
  //   getPCrecommend().then((res) => {
  //   })
  // }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#recommend{
  position: fixed;
  top:87px;bottom: 0;
  width: 100%;
  z-index: -1;
  #recommend-content{
    width: 100%;
    overflow: hidden;
  }
}
#recommend-songlist {
  h3 {
    color: $color-theme;
    line-height: 65px;
    font-size: 14px;
    font-weight: 200;
    text-align: center;
  }
  .songlist-item {
    display: flex;
    padding: 0 20px 20px 20px;
    .songlist-img {
      width: 60px;
      height: 60px;
      flex: 0 0 60px;
    }
    .songlist-info {
      flex: 1;
      padding-left: 20px;
      .songlist-author {
        display: block;
        color: #fff;
        font-size: 14px;
      }
      .songlist-desc {
        display: block;
        color: $color-text-ll;
        font-size: 13px;
        margin-top: 15px;
        @include no-wrap();
      }
    }
  }
}
</style>
