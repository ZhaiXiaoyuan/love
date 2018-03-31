<template>
  <div class="view-pic-modal">
    <div class="mask" @click="close()"></div>
    <div class="modal-content">
      <div class="modal-body">
        <div class="view-win" @click="alert(233)">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522531460227&di=bb3fe2a8d28727e8bd4f2d9018c902f6&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F6e7e32d0fe24a654203d47bd96196188fa6eed8d.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .view-pic-modal{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top:0px;
    left: 0px;
  }
  .mask{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top:0px;
    left: 0px;
    background: rgba(0,0,0,0.5);
  }
  .modal-content{
    width: 100%;
    height: 100%;
  }
  .modal-body{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .view-win{
      height: 80%;
      img{
       height: 100%;
      }
    }
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      options:{

      }
    },
    data: function () {
      return {

      }
    },
    computed: {},
    watch: {

    },
    methods: {
      close:function () {
        this.$el.remove();
        this.$destroy();
      }
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
