<!--导航栏-->
<template>
    <div class="nav-bar" v-if="pageName!='login'">
        <ul>
          <router-link   to="/home" tag="li">
            <span>首页</span>
            <span class="en-text">HOME</span>
          </router-link>
          <router-link  to="/album" tag="li">
            <span>相册</span>
            <span class="en-text">ALBUM</span>
          </router-link>
          <router-link  to="/time"  tag="li">
            <span>时刻</span>
            <span class="en-text">TIME</span>
          </router-link>
          <router-link  to="/record"  tag="li">
            <span>记录</span>
            <span class="en-text">RECORD</span>
          </router-link>
          <router-link  to="/wish" tag="li">
            <span>心愿</span>
            <span class="en-text">WISH</span>
          </router-link>
        </ul>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .nav-bar{
      position: fixed;
      top:0px;
      left: 0px;
      z-index: 10;
      background: none;
      width: 140px;
      height: 100%;
      text-align: center;
      background: rgba(255,255,255,0.8);
    }
    ul{
      text-align: center;
      color: #333;
      padding-top: 50px;
      li{
        opacity: 0.5;
        cursor: pointer;
        span{
          display: block;
          font-size: 30px;
          font-family: '宋体';
          &+span{
            display: inline-block;
            position: relative;
            margin-top: 5px;
            font-size: 10px;
            font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
            &:before{
              position: absolute;
              content: '';
              width: 7px;
              height: 1px;
              background: #333;
              top:0rem;
              bottom: 0rem;
              left: -11px;
              margin: auto;
            }
            &:after{
              position: absolute;
              content: '';
              width: 7px;
              height: 1px;
              background: #333;
              top:0rem;
              bottom: 0rem;
              right: -11px;
              margin: auto;
            }
          }
        }
        &+li{
          margin-top: 35px;
        }
        &.active{
          opacity: 0.9;
        }
      }
    }
</style>

<script>
    import Vue from 'vue'


    export default {
        props: {

        },
        data:function () {
          return {
              pageName:'',
              loverName:''
          }
        },
        watch:{
          '$route': function(to, from) {
            this.pageName=this.$route.name;
          },
        },
        methods:{
          link:function (value) {

          }
        },
        created: function () {
        },
        mounted:function () {
          this.pageName=this.$route.name;
        },
    }


</script>
