<!--首页-->
<template>
    <div class="home-page" :style="{background: 'url('+coverPic+') no-repeat center',backgroundSize: 'auto 140%'}">
      <div class="page-content">
        <img class="flower-icon" :src="weddingFlower">
       <!-- <p class="love-time">这是我们相爱的第<em class="en-text">99</em>天.</p>-->
        <div class="cover-win">
          <div class="win-content">
            <img class="flower-icon" :src="coverPic">
          </div>
        </div>
        <i class="icon married-icon"></i>
      </div>
      <div class="page-footer">
        ICP备&nbsp;&nbsp;5678910
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>

<script>
    import Vue from 'vue'
    import '../../static/lib/punyCode/punyCode.js'

    export default {
        components: {

        },
        data: function () {
            return {
              hostName:null,
              coverPic:null,
              weddingFlower:require('../images/common/home-wedding-flower-icon.png'),
              homeBgInfo:null,
            }
        },
        computed: {},
        watch: {},
        methods: {

        },
        created: function () {
        /*  Vue.api.homePageData().then(function (resp) {

          });*/
        },
        mounted: function () {
          /**/
          this.hostName=window.location.hostname;
          let params={
            timeStamp:Vue.tools.genTimestamp(),
            domain:new IdnMapping().toUnicode(this.hostName),
          }
          Vue.api.getDomainInfo(params).then((resp)=>{
            if(resp.respStatus=='success'){
              this.homeBgInfo=JSON.parse(resp.respMsg).indexBackgroundPic;
              this.homeBgInfo=this.homeBgInfo?JSON.parse(this.homeBgInfo):null;
              this.coverPic=this.homeBgInfo?this.homeBgInfo.publicUrl:require('../images/common/example-picture.jpg');
            }else{
              this.coverPic=require('../images/common/example-picture.jpg');
            }
          });
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
