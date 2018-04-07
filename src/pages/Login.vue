<!--登录-->
<template>
    <div class="login-page">
      <div class="login-modal">
        <div class="mask"></div>
        <div class="modal-content">
          <div class="modal-header">
            <i class="icon login-wedding-flower-icon"></i>
          </div>
          <div class="modal-body">
            <p class="declaration">
              <span>{{loverName}}</span>
              <span class="dot"></span>
              <span>我爱你</span>
            </p>
            <div class="input-row">
              <input type="password" v-model="password" placeholder="请输入密匙">
            </div>
            <div class="cm-btn submit-btn" @click="login()">
              <span>确认</span>
            </div>
          </div>
        </div>
      </div>
      <div class="page-footer">
        ICP备&nbsp;&nbsp;5678910
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>

<script>
    import Vue from 'vue'
    import md5 from 'js-md5'
    import $ from 'jquery'
    import '../../static/lib/punyCode/punyCode.js'

    export default {
        components: {
        },
        data: function () {
            return {
              hostName:null,
              loverName:null,
              vipLevel:0,
              password:null,
              loginBgInfo:null,
              coverPic:null,
            }
        },
        computed: {},
        watch: {},
        methods: {
          login:function () {
            let that=this;
            if(!regex.pwd.test(this.password)){
              this.operationFeedback({type:'warn',text:regex.pwdAlert});
              return;
            }
            let params={
              timeStamp:Vue.tools.genTimestamp(),
              domain:new IdnMapping().toUnicode(this.hostName),
              password:md5.hex(this.password)
            }
            let fb=this.operationFeedback({text:'登录中...'});
            Vue.api.loginByDomain(params).then(function (resp) {
              if(resp.respStatus=='success'){
                that.$cookie.set('session',JSON.stringify(resp.respMsg),7);
                fb.setOptions({type:'complete',text:'登录成功'});
                that.$router.push({name:'home'});
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            });
          }
        },
        created: function () {
        },
        mounted: function () {
         /**/
          this.hostName=window.location.hostname;
          let hostNameStrArr=this.hostName.split('.');
          if(hostNameStrArr[1]=='only'){
            this.vipLevel=1;
            this.loverName=hostNameStrArr[0];
          }
          /**/
          let sessionInfo=Vue.tools.sessionInfo();
          let params={
            timeStamp:sessionInfo.timeStamp,
            domain:new IdnMapping().toUnicode(this.hostName),
          }
          Vue.api.getDomainInfo(params).then((resp)=>{
            if(resp.respStatus=='success'){
              this.loginBgInfo=JSON.parse(resp.respMsg).loginBackgroundPic;
              this.loginBgInfo=this.loginBgInfo?JSON.parse(this.loginBgInfo):null;
              this.coverPic=this.loginBgInfo?this.loginBgInfo.publicUrl:require('../images/common/kiss-bg.jpg');
              $('.login-page').css({
                'background':'url('+this.coverPic+') no-repeat center',
                'background-size':"cover"
              });
            }else{
              this.coverPic=require('../images/common/kiss-bg.jpg');
              $('.login-page').css({
                'background':'url('+this.coverPic+') no-repeat center',
                'background-size':"cover"
              });
            }
          });
          //
         /* console.log('test:',new IdnMapping().toUnicode(this.hostName))*/
        },
        route: {
           /* data: function(transition) {
                return Vue.utils.getCustomer().then(function (data) {
                    {
                        return {}
                    }
                });


            },
            waitForData: true,*/
        }
    };
</script>
