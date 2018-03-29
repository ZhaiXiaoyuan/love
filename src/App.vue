<template>
  <div id="app" v-cloak>
    <nav-bar></nav-bar>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import "less/main";
  [v-cloak] { display: none }
  #app{
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import Vue from 'vue'
  import NavBar from './components/NavBar.vue'
export default {
  name: 'app',
  components:{
    NavBar,
  },
  mounted: function () {

  }
}
</script>
