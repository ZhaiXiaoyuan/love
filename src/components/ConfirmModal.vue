<template>
  <modal :options="options" ref="modal">
    <div class="modal-header">
      <p class="title">{{options.title}}</p>
    </div>
    <div class="modal-body" v-html="options.html">

    </div>
    <div class="modal-footer">
      <div class="handle-btn" @click="cancelHandle()">{{options.no}}</div>
      <div class="handle-btn" @click="okHandle()">{{options.yes}}</div>
    </div>
  </modal>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .confirm-modal{}
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      options: {
        type: Object,
        default:function () {
          return {
            className: '',      /*模态框的className*/
            title: '温馨提示', //提示标题
            html: '',   //提示内容
            yes: '确 定',
            no: '取 消',
            ok:null,//确定的回调
            cancel:null,//取消的回调
          }
        }
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
      okHandle:function () {
        this.close();
        this.options.ok&&this.options.ok();
      },
      cancelHandle:function () {
        this.close();
        this.options.cancel&&this.options.cancel();
      },
      close:function () {
        this.$refs.modal.close();
      },
      open:function () {
        this.show=true;
      }
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
