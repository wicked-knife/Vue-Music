<template>
  <div id='rank' v-if='rankLists.length > 0' ref='rank'>
    <scroll ref='scroll'>
      <ul>
        <li class='rank-item' v-for='(list, index) in rankLists' :key='index' @click.stop='_selectRank(list)'
        v-if='rankLists.length > 0'>
          <div class='item-left'><img v-lazy="list.picUrl" class='list-img'></div>
          <div class="item-right">
            <span>1.{{list.songList[0].songname}}-{{list.songList[0].singername}}</span>
            <span>2.{{list.songList[1].songname}}-{{list.songList[1].singername}}</span>
            <span>3.{{list.songList[2].songname}}-{{list.songList[2].singername}}</span>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view v-if='rankLists.length > 0' :rankList='currentList'/>
  </div>
</template>

<script>
import { getRank } from '@/common/api/rank'
import scroll from '@/base/scroll/scroll'
import { mapMutations, mapGetters } from 'vuex'
import RankList from '@/components/RankList/RankList'
import { getRankList } from '@/common/api/rankList'
import {createRankSong} from '@/common/js/song'
import { playlistMixin } from '@/common/js/mixin'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      rankLists: [],
      currentList: {}
    }
  },
  created () {
    this._getRank()
  },
  methods: {
    ...mapMutations({
      SET_TOPLIST: 'SET_TOPLIST'
    }),
    _getRank () {
      getRank().then(res => {
        this.rankLists = res.data.topList
      })
    },
    _selectRank (list) {
      this.currentList = list
      getRankList(list.id).then(res => {
        let songlist = res.songlist.map((song) => {
          return song.data
        })
        let songs = createRankSong(songlist)
        this.SET_TOPLIST(songs)
        this.$router.push(`/rank/${list.id}`)
      })
    },
    handlePlaylist () {
      let bottom
      this.playlist.length > 0 ? bottom = '60px' : bottom = ''
      setTimeout(() => {
        this.$refs['rank'].style.bottom = bottom
        this.$refs.scroll.refresh()
      }, 500)
    }
  },
  computed: {
    ...mapGetters(['topList'])
  },
  components: {
    scroll,
    RankList
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#rank {
  position: fixed;
  top: 87px;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  overflow: hidden;
  .rank-item {
    display: flex;
    padding-top: 20px;
    width: 100%;
    .item-left {
      flex: 0 0 100px;
      width: 100px;
      font-size: 0;
      .list-img {
        width: 100px;
        height: 100px;
      }
    }
    .item-right {
      flex: 1;
      padding: 0 20px;
      box-sizing: border-box;
      background-color: $color-highlight-background;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      span {
        display: block;
        color: $color-text-ll;
        line-height: 26px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
