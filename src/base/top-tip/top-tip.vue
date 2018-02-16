<template>
<transition name='up'>
  <div id='top-tip' v-show='isShow'>
    <slot></slot>
  </div>
</transition>

</template>

<script>
export default {
  props: {
    delay: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      isShow: false,
      timer: null
    }
  },
  methods: {
    show () {
      clearTimeout(this.timer)
      this.isShow = true
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide () {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#top-tip{
  position: fixed;
  top:0;left:0;right: 0;
  height: 50px;
  background-color:$color-dialog-background ;
  z-index: 400;
  display: flex;
  align-items: center;
  justify-content: center;
}
.up-enter,
.up-leave-to {
  transform: translateY(-100%);
}
.up-enter-active,
.up-leave-active {
  transition: all 0.4s;
}
</style>
