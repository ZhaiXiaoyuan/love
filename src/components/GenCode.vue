<template>
  <div class="gen-code" :class="{'cm-disabled':time<60||!this.options.phone}" @click="genCode()">
    {{time==60?'获取验证码':time+'S'}}
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .gen-code{
    position: absolute;
    width: 80px;
    height: 35px;
    line-height: 35px;
    border-radius: 0.06rem;
    background: #4e89ee;
    font-size: 0.28rem;
    color: #fff;
    text-align: center;
    top:0rem;
    bottom:0rem;
    right: 0.3rem;
    margin: auto;
    cursor: pointer;
    border-radius: 2px;
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      options:{
        phone:null,
        ok:()=>{},
      }
    },
    data: function () {
      return {
        time:60,
        isRequesting:false
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      genCode:function () {
        let that=this;
        if(!regex.phone.test(this.options.phone)){
          this.operationFeedback({text:regex.phoneAlert});
          return;
        }
        if(this.isRequesting||this.time<60){
          return;
        }
        this.isRequesting=true;
        let fb=this.operationFeedback({text:'发送中...'});
        let params={
            ...Vue.tools.sessionInfo(),
          phone:this.options.phone
        }
        Vue.api.sendVerfifyCode(params).then(function (resp) {
          that.isRequesting=false;
          if(resp.respStatus=='success'){
            that.options.ok&&that.options.ok(resp.respMsg.bizId);
            fb.setOptions({type:'complete',text:'发送成功'});
            var interval=setInterval(function () {
              if(that.time==0){
                that.time=60;
                clearInterval(interval);
              }else{
                that.time--;
              }
            },1000);
          }else{
            fb.setOptions({type:'warn',text:resp.respMsg});
          }
        });
      }
    },
    created: function () {

    },
    mounted: function () {
      /*修改父dom的position*/
      this.$el.parentNode.style.position='relative';
    }
  };
</script>
