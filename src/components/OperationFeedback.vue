<template>
  <div class="operation-feedback">
    <div class="mask" v-if="mask"></div>
    <div class="content-block">
      <i class="icon" :class="{'loading-icon':type=='operating','complete-icon':type=='complete','clear-icon':type=='clear','warn-icon':type=='warn'}"></i>
      <p class="text">{{text}}</p>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .operation-feedback{
   /* display: flex;
    position: fixed;
    z-index: 1000;
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;*/
  }
  .mask{
    position: fixed;
    top:0px;
    left: 0px;
    z-index: 9998;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.45);
  }
  .content-block{
    position: fixed;
    z-index: 9999;
    display: inline-block;
    padding: 20px 10px;
    min-width: 200px;
    max-width: 300px;
    text-align: center;
    background: rgba(0,0,0,0.8);
    border-radius: 5px;

    left: 50%;
    bottom: 50%;
    -webkit-transform: translate3d(-50%,50%,0);
    transform: translate3d(-50%,50%,0);
  }
  .text{
    padding-top: 5px;
    margin: 0px;
    position: relative;
    font-size:16px;
    color:#fff;
    text-align: center !important;
    line-height: 24px;
    font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
  }
  .icon{
    display: none;
    width:48px;
    height: 48px;
  }
  @-webkit-keyframes loading-animate {
    0% {
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
    }
    100% {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
  @keyframes loading-animate {
    0% {
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
    }
    100% {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
  .operation-feedback .loading-icon{
    display: inline-block;
    background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
    background-size: 100% 100%;
    -webkit-animation: loading-animate 1s steps(12, end) infinite;
    animation: loading-animate 1s steps(12, end) infinite;
  }
  .complete-icon{
    display: inline-block;
    background: url("../images/common/handle-success-icon.png") no-repeat;
    background-size: 100% 100%;
  }
  .clear-icon{
    display: inline-block;
    background: url("../images/common/clear-icon.png") no-repeat;
    background-size: 100% 100%;
  }
   .warn-icon{
    display: inline-block;
    background: url("../images/common/warn-icon.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
<script>
  export default {
    components: {

    },
    props:{
    },
    data: function () {
      return {

      }
    },
    computed: {},
    watch: {
      type:function (newValue,oldValue) {
        if(newValue!='operating'){
          this.typeChanged();
        }
      },
    },
    methods: {
      close: function () {
        this.$el.remove();
        this.$destroy();
      },
      typeChanged:function () {
        if(this.type!='operating'){
          if(this.delayForDelete){
            setTimeout(()=>{
              this.close();
            },this.delayForDelete);
          }else{
            this.close();
          }
        }
      }
    },
    created: function () {

    },
    mounted: function () {
      this.typeChanged();
    },
    destroyed:function () {

    }
  };
</script>
