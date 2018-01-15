<template>
  <div id="app" v-cloak>
    <router-view/>
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
export default {
  name: 'app',
  mounted: function () {

  }
}
</script>
