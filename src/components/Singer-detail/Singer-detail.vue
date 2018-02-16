<template>
  <transition name='slide'>
    <div id='singer-detail'>
      <i class='iconfont icon-back' @click='goBack'></i>
      <music-list :singer='this.singer' v-if='this.singer.avatar && this.songs.length' :songs='songs'></music-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerList } from '../../common/api/singerList'
import {createSingerSong} from '../../common/js/song'
import MusicList from '@/components/Music-List/Music-List'
export default {
  data () {
    return {
      songs: {}
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    _getSingerList (id) {
      if (!this.singer.id) {
        this.$router.push('/singer')
      } else {
        getSingerList(id).then(data => {
          this.songs = createSingerSong(data.data.list)
        })
      }
    }
  },
  computed: {
    ...mapGetters(['singer'])
  },
  created () {
    this._getSingerList(this.singer.id)
  },
  components: {
    MusicList
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
#singer-detail {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: $color-background;
  overflow: hidden;
  i{
    position: absolute;
    font-size: 30px;
    z-index: 5;
    color:$color-theme;
  }
}
</style>
