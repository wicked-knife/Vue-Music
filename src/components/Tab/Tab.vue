<template>
  <div id="tab">
    <router-link to="/recommend" tag="div" class="tab-item"><span>推荐</span></router-link>
    <router-link to="/singer" tag="div" class="tab-item"><span>歌手</span></router-link>
    <router-link to="/rank" tag="div" class="tab-item"><span>排行</span></router-link>
    <router-link to="/search" tag="div" class="tab-item"><span>搜索</span></router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../common/style/index.scss';
#tab {
  display: flex;
  .tab-item {
    flex: 1;
    text-align: center;
    color: $color-text-ll;
    font-size: 14px;
    padding: 10px;
    span{
      padding-bottom: 6px;
    }
  }
  .router-link-active {
    color:$color-theme;
    border-bottom: 2px solid $color-theme;
  }
}
</style>
