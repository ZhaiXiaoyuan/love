<template>
  <modal :options="options" ref="modal">
    <div class="modal-header">
      <p class="title">{{options.title}}</p>
    </div>
    <div class="modal-body">
      <div class="form">
        <div class="input-row">
          <span class="label">手机号</span>
          <input type="tle" v-model="phone" placeholder="请出入手机号" maxlength="20">
        </div>
        <div class="input-row gen-code-row">
          <span class="label">验证码</span>
          <input type="text" v-model="code" maxlength="10">
          <gen-code :options="genCodeOptions"></gen-code>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div class="handle-btn" @click="cancelHandle()">{{options.no}}</div>
      <div class="handle-btn" @click="okHandle()">{{options.yes}}</div>
    </div>
  </modal>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .verify-modal{

  }
  .form{
    padding: 0px 20px;
  }
  .input-row{
    display: flex;
    align-items: center;
    .label{
      margin-right: 10px;
      font-size: 14px;
      color: #666;
    }
    input{
      width: 210px;
      height: 35px;
      padding: 0px 10px;
      border: 1px solid #e5e5e5;
      border-radius: 2px;
      font-size: 14px;
    }
    &.gen-code-row{
      input{
        width: 120px;
      }
    }
    &+.input-row{
      margin-top: 20px;
    }
  }
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
        phone:null,
        code:null,
        bizId:null,//短信唯一识别码
        genCodeOptions:{
          phone:this.phone,
          ok:(data)=>{
            console.log('data:',data);
            this.bizId=data;
          }
        }
      }
    },
    computed: {},
    watch: {
      phone:function (value) {
        this.genCodeOptions.phone=value;
      }
    },
    methods: {
      okHandle:function () {
        if(!this.code){
          this.operationFeedback({type:'warn',text:'请输入验证码'});
          return;
        }
        Vue.api.checkVerfifyCode({...Vue.tools.sessionInfo(),bizId:this.bizId,phone:this.phone,verifyCode:this.code}).then((resp)=>{
          if(resp.respStatus=='success'){
            this.close();
            this.options.ok&&this.options.ok();
          }else{
            this.operationFeedback({type:'warn',text:resp.respMsg});
          }
        })
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
