<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import tab from '@/components/Tab/Tab'
import MHeader from '@/components/M-Header/M-Header'
import player from '@/components/player/player'
export default {
  components: {
    tab,
    MHeader,
    player
  }
}
</script>

<style lang="scss" scoped>
@import './common/style/index.scss';
#app {
  font-family: 'PingFang SC','STHeitiSC-Light','Helvetica-Light','arial','sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
}
</style>
