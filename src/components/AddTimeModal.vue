<!--添加时刻弹窗-->
<template>
  <div class="add-time-modal">
    <div class="mask"></div>
    <div class="modal-content">
      <div class="modal-body">
        <div class="new-time-panel">
          <div class="panel-header">
            <span class="cm-btn return-btn">
              <i class="icon return-icon"></i>
              <span>返回</span>
            </span>
            <span class="title">新的时刻</span>
          </div>
          <div class="panel-body">
            <div class="nav-block">
              <div class="block-hd">
                推荐
              </div>
              <div class="block-bd">
                <ul>
                  <li class="active">甜蜜</li>
                  <li>快乐</li>
                  <li>思念</li>
                </ul>
              </div>
            </div>
            <div class="title-block">
              <div class="cm-btn item">
                <i class="icon cross-icon"></i>
                <span>听一场演唱会</span>
              </div>
              <div class="cm-btn item">
                <i class="icon cross-icon"></i>
                <span>听一场</span>
              </div>
              <div class="cm-btn item">
                <i class="icon cross-icon"></i>
                <span>听一场</span>
              </div>
              <div class="cm-btn item">
                <i class="icon cross-icon"></i>
                <span>听一场演唱会</span>
              </div>
              <div class="cm-btn item">
                <i class="icon cross-icon"></i>
                <span>听一场演唱会</span>
              </div>
              <div class="cm-btn item">
                <i class="icon cross-icon"></i>
                <span>听一场演唱会</span>
              </div>
            </div>
            <div class="cm-btn random-btn">
              <p>随机</p>
              <p>选择</p>
            </div>
          </div>
        </div>
        <div class="time-queue-panel">
          <div class="panel-header">
            等待中
          </div>
          <div class="panel-body cm-scroll">
            <ul>
              <li class="cm-btn" v-for="(item,index) in waitingList">{{item.momentName}}<input type="file" @change="selectFile($event,index)"></li >
            </ul>
          </div>
          <div class="panel-footer">
            <span class="cm-btn diy-btn">自定义</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
  .add-time-modal{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
    font-family: '宋体';
  }
  .modal-content{
    position: fixed;
    width: 65%;
    height: 742px;
    background: #fff;
    border: 1px solid #e5e5e5;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
    padding: 20px;
    min-width: 900px;
    max-width: 1200px;
    right: 5%;
  }
  .modal-body{
    display: flex;
    height: 100%;
  }
  .new-time-panel{
    height: 100%;
    flex: 3;
    margin-right: 20px;
    .panel-header{
      position: relative;
      height: 10%;
      text-align: center;
      padding-top: 1%;
      .title{
        font-size: 28px;
        color: #b3b3b3;
      }
      .return-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0px;
        top:10%;
        width: 80px;
        height: 32px;
        text-align: center;
        border:1px solid #e5e5e5;
        border-radius: 5px;
        span{
          padding-left: 10px;
          font-size: 16px;
          color: #b3b3b3;
        }
      }
    }
    .panel-body{
      position: relative;
      height: 90%;
      border: 1px solid #ccc;
      .nav-block{
        float: left;
        width: 22%;
        height: 100%;
        .block-hd{
          padding: 15px 0px;
          position: relative;
          font-size: 24px;
          color: #b2b2b2;
          text-align: center;
          &:after{
            position: absolute;
            content: '';
            width: 60%;
            height: 1px;
            background: #ccc;
            left: 0rem;
            right: 0rem;
            bottom: 0rem;
            margin: auto;
          }
        }
        .block-bd{
          padding-top: 20px;
          height: 100%;
          ul{
            li{
              font-size: 18px;
              color: #b2b2b2;
              height: 50px;
              line-height: 50px;
              text-align: center;
              cursor: pointer;
              &.active{
                color: #666;
              }
            }
          }
        }
      }
      .title-block{
        float: left;
        width: 78%;
        height: 100%;
        border-left: 1px solid #ccc;
        overflow: hidden;
        padding: 30px 0px;
        .item{
          float: left;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
          font-size: 18px;
          color: #b2b2b2;
          border: 1px solid #e5e5e5;
          padding: 0px 20px;
          margin: 10px 15px;
          .icon{
            margin-right: 20px;
          }
        }
      }
      .random-btn{
        position: absolute;
        right: 20px;
        bottom: 20px;
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px solid #e5e5e5;
        border-radius: 50%;
        box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
        font-size: 14px;
        color: #b2b2b2;
      }
    }
  }
  .time-queue-panel{
    margin-left: auto;
    flex: 1.1;
    height: 100%;
  }
  @media screen and(max-width: 1600px) {
    .modal-content{
      width: 78%;
      height: 640px;
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
            waitingList:[],
          }
        },
        methods:{
          getWaitingTime:function () {
            let params={
              ...Vue.tools.sessionInfo()
            }
            Vue.api.getWaitingTime(params).then((resp)=>{
              if(resp.respStatus=='success'){
                this.waitingList=JSON.parse(resp.respMsg);
              }else{

              }
            });
          },
          getPgcTime:function () {
            let params={
              ...Vue.tools.sessionInfo()
            }
            Vue.api.getPgcTime(params).then((resp)=>{
              if(resp.respStatus=='success'){

              }else{

              }
            });
          },
          addWaitingTime:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              momentName:'标题'+Math.random()*1000
            };
            Vue.api.addWaitingTime(params).then((resp)=>{
              if(resp.respStatus=='success'){

              }else{

              }
            });
          },
        },
        created: function () {

        },
        mounted:function () {
          this.getPgcTime();
          //临时测试
         /* this.addWaitingTime();*/
        },
    }


</script>
