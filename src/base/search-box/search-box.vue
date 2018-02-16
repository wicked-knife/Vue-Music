<template>
  <div id='search-box'>
    <div id='search-box-warpper'>
      <i class='iconfont icon-search'></i>
      <input type="text" id="search-query" :placeholder='placeHolder' v-model="query">
      <i class='iconfont icon-round_close_fill_light' v-show="query" @click='_clearQuery'></i>
    </div>
  </div>
</template>

<script>
import {throttle} from '@/common/js/utils'
export default {
  props: {
    placeHolder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    _clearQuery () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    }
  },
  created () {
    this.$watch('query', throttle((newval) => {
      this.$emit('queryChange', newval)
    }, 500))
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/style/index.scss';
#search-box{
  display: flex;
  padding: 0 20px;
  #search-box-warpper{
    flex:1;
    height: 40px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content:center;
    padding:0 10px;
    background-color: $color-highlight-background;
    #search-query{
      flex:1;
      outline: none;
      border:none;
      background-color: $color-highlight-background;
      color:$color-text-l;
      font-size: 14px;
      padding: 0 10px;
      &::-webkit-input-placeholder{
        color:$color-text-d;
      }
    }
    i{
      font-size: 16px;
      color:$color-dialog-background;
      padding: 0 4px;
    }
  }
}
</style>
