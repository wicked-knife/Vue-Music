<template>
  <div id='search-list'>
    <transition-group tag='ul' name='list'>
      <li v-for='item in searchHistory' :key='item' class='list-item' @click='select(item)'>
        <span>{{item}}</span>
        <i class='iconfont icon-close' @click.stop='deleteOne(item)'></i>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['searchHistory'])
  },
  methods: {
    deleteOne (query) {
      this.$emit('delete', query)
    },
    select (query) {
      this.$emit('select', query)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#search-list {
  .list-item{
    display: flex;
    align-items: center;
    padding: 5px 0;
    span{
      flex:1;
      font-size: 14px;
      color: $color-dialog-background;
    }
    i{
      color:$color-dialog-background;
      padding: 0 4px;
      font-weight: bold;
    }
  }
}
.list-enter,
.list-leave-to {
  transform: translateX(110%);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}
</style>
