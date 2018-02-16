<template>
  <div id='search' v-if='hotKey.length' @touchstart='fresh'>
    <search-box ref='search' @queryChange='queryChange'></search-box>
    <div>
      <div id='hotKey' v-if='hotKey.length' v-show='!query'>
        <h3 id='hotKey-title'>热门搜索</h3>
        <ul>
          <li v-for='(key, index) in hotKey' :key='index' class='hotKey-item' @click='_selectHotKey(key.k)'>
            {{key.k}}</li>
        </ul>
      </div>
      <div id='scroll-warpper' ref='scroll-warpper' v-show='searchHistory.length && !query'  v-if='searchHistory.length'>
        <scroll :data='searchHistory' ref='scroll'>
          <div id='search-history' ref='fix-hook'>
            <h3 id='search-history-title'>
              <span>搜索历史</span>
              <i class='iconfont icon-delete' @click.stop='showConfirm'></i>
            </h3>
            <search-list @delete='deleteOne' @select='pickHistory'></search-list>
          </div>
        </scroll>
      </div>
    </div>
    <suggest :query='query' v-show='query' @select='saveSearch'></suggest>
    <Confirm title="是否清空搜索历史" v-model="confirmShow" @on-cancel="onCancel" @on-confirm="onConfirm"></Confirm>
    <router-view/>
  </div>
</template>

<script>
import SearchBox from '@/base/search-box/search-box'
import Suggest from '@/components/Suggest/Suggest'
import SearchList from '@/base/search-list/search-list'
import scroll from '@/base/scroll/scroll'
import { playlistMixin, search } from '@/common/js/mixin'
import { Confirm } from 'vux'
import { getHotKey } from '@/common/api/hotKey'
import { trim } from '@/common/js/utils'
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [playlistMixin, search],
  data () {
    return {
      hotKey: [],
      confirmShow: false
    }
  },
  computed: {
    ...mapGetters(['searchHistory'])
  },
  methods: {
    ...mapActions([
      'deleteFromHistory',
      'emptySearchHistory'
    ]),
    _getHotKey () {
      getHotKey().then(res => {
        this.hotKey = res.data.hotkey.slice(0, 10)
      })
    },
    _selectHotKey (query) {
      query = trim(query)
      this.$refs['search'].setQuery(query)
    },
    deleteOne (query) {
      this.deleteFromHistory(query)
    },
    showConfirm () {
      this.confirmShow = true
    },
    onConfirm () {
      this.emptySearchHistory()
    },
    onCancel () {
      this.confirmShow = false
    },
    pickHistory (query) {
      this.$refs['search'].setQuery(query)
    },
    handlePlaylist () {
      if (this.searchHistory.length) {
        let bottom
        this.playlist.length ? (bottom = '60px') : (bottom = '')
        setTimeout(() => {
          this.$refs['fix-hook'].style['padding-bottom'] = bottom
          this.$refs['scroll'].refresh()
        }, 500)
      }
    },
    fresh () {
      if (this.searchHistory.length) {
        this.$refs['scroll'].refresh()
      }
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    scroll
  },
  created () {
    this._getHotKey()
  },
  mounted () {
    if (this.searchHistory.length) {
      setTimeout(() => {
        this.$refs['scroll-warpper'].style.height = `${document.documentElement
          .clientHeight - 296}px`
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#search {
  position: fixed;
  width: 100%;
  top: 87px;
  bottom: 0;
  padding-top: 20px;
  #hotKey {
    padding: 20px 20px 0 20px;
    #hotKey-title {
      font-size: 14px;
      font-weight: 200;
      color: $color-text-ll;
    }
    .hotKey-item {
      display: inline-block;
      background-color: $color-highlight-background;
      padding: 4px 10px;
      border-radius: 10px;
      margin-right: 10px;
      margin-top: 10px;
      color: $color-dialog-background;
    }
  }
  #scroll-warpper {
    position: relative;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
    #search-history {
      padding: 10px 20px 0 20px;
      #search-history-title {
        font-size: 14px;
        font-weight: 200;
        color: $color-text-ll;
        display: flex;
        align-items: center;
        span {
          flex: 1;
        }
        i {
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
