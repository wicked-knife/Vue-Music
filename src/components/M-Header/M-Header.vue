<template>
  <div id="m-header">
      <img src="../../common/image/logo2.png" id="app-logo">
      <h1 id="app-name">波斯音乐</h1>
      <router-link to="/center" tag='span'>
            <i class="iconfont icon-people"></i>
      </router-link>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
@import '../../common/style/index.scss';
  #m-header{
    height: 44px;
    text-align: center;
    color:$color-theme;
    overflow: hidden;
    #app-logo{
      width:60px;height: 32px;
      position: relative;
      top:7px;
      margin-left: 30px;
    }
    #app-name{
      display: inline-block;
      color:$color-theme;
      font-size: 18px;
      line-height: 44px;
      margin-left: 6px;
      font-family: 'Microsoft Yahei'
    }
    i{
      font-size: 24px;
      line-height: 44px;
      padding:0 10px;
      float: right;
      margin-top: 3px;
    }
  }
</style>
