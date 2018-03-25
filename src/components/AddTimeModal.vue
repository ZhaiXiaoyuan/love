<!--添加时刻弹窗-->
<template>
  <div class="add-time-modal">
    <div class="mask"></div>
    <div class="modal-content">
      <div class="modal-body">
        <div class="new-time-panel">
          <div class="panel-header">
            <span class="cm-btn return-btn" @click="close()">
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
                  <li v-for="(subList,index) in recommendedList" :class="{'active':subList==curSubList}" @click="selectSubList(index)">
                    {{subList.label}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="title-block">
              <div class="cm-btn item" v-for="(item,index) in curSubList.array" @click="addWaitingTime(item.momentName)">
                <i class="icon cross-icon"></i>
                <span>{{item.momentName}}</span>
              </div>
            </div>
            <div class="cm-btn random-btn" @click="randomName()">
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
              <li class="" v-for="(item,index) in options.waitingList">
                <span>{{item.momentName}}</span>
                <i class="icon del-min-icon cm-btn del-btn" @click="delWaitingTime(index)"></i>
              </li >
            </ul>
          </div>
          <div class="panel-footer">
            <span class="cm-btn diy-btn" @click="showNewNameBlock(true)">自定义</span>
          </div>
        </div>
      </div>
      <div class="new-name-block" :class="{'random-name':isRandom}" v-if="newNameBlockFlag">
        <div class="block-bd"><input type="text" v-model="newName" maxlength="50" placeholder="输入时刻名"></div>
        <div class="block-ft">
          <i class="icon ok-btn-icon cm-btn ok-btn" @click="selectName()"></i>
          <i class="icon cancel-btn-icon cm-btn cancel-btn" @click="showNewNameBlock(false)"></i>
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
    z-index: 100;
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
    box-shadow: none;
    li{
     padding-right: 30px !important;
    }
  }
  .new-name-block{
    position: absolute;
    z-index: 10;
    width: 400px;
    height: 240px;
    background: #fff;
    border: 1px solid #e5e5e5;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
    left: 0px;
    right: 0px;
    top:0px;
    bottom: 0px;
    margin: auto;
    text-align: center;
    padding-top: 50px;
    input{
      border: 1px solid #b3b3b3;
      width: 280px;
      height: 44px;
      padding: 0px 20px;
      text-align: center;
    }
    .block-ft{
      margin-top: 50px;
      .cancel-btn{
        margin-left: 160px;
      }
    }
    &.random-name{
      input{
        border: none;
        font-size: 24px;
        color: #b3b3b3;
        pointer-events: none;
      }
    }
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
          options:{
            waitingList:[],
            ok:()=>{},
            cancel:()=>{}
          }
        },
        data:function () {
          return {
            recommendedList:[],
            curSubList:[],
            itemList:[],
            newNameBlockFlag:false,
            newName:null,
            isRandom:false,
          }
        },
        methods:{
          close:function () {
            this.$el.remove();
            this.$destroy();
          },
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
                this.recommendedList=JSON.parse(resp.respMsg);
                this.recommendedList.forEach((item,index)=>{
                  item.array=JSON.parse(item.array);
                  item.label=item.array[0].label;
                  if(index==0){
                    this.curSubList=item;
                  }
                  this.itemList.push(...item.array);
                })
              }else{

              }
            });
          },
          selectSubList:function (index) {
            this.curSubList=this.recommendedList[index];
          },
          addWaitingTime:function (title,callback) {
            let params={
              ...Vue.tools.sessionInfo(),
              momentName:title
            };
            let fb=this.operationFeedback({text:'添加中...'});
            Vue.api.addWaitingTime(params).then((resp)=>{
              if(resp.respStatus=='success'){
                this.options.waitingList.push({
                  momentName:title
                });
                fb.setOptions({type:'complete',text:'添加成功'});
                callback&&callback();
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            });
          },
          delWaitingTime:function (index) {
            let params={
              ...Vue.tools.sessionInfo(),
              momentName:this.options.waitingList[index].momentName
            }
            let fb=this.operationFeedback({text:'删除中...'});
            Vue.api.delWaitingTime(params).then((resp)=>{
              if(resp.respStatus=='success'){
                this.options.waitingList.splice(index,1);
                fb.setOptions({type:'complete',text:'删除成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            })
          },
          showNewNameBlock:function (flag) {
            if(flag){
              this.newNameBlockFlag=true;
            }else{
              this.newNameBlockFlag=false;
              this.isRandom=false;
              this.newName=null;
            }
          },
          selectName:function () {
            if(!this.newName||this.newName==''){
              this.operationFeedback({type:'warn',text:'请输入时刻名称'});
              return;
            }
            this.addWaitingTime(this.newName,()=>{
             this.showNewNameBlock(false);
            });
          },
          randomName:function () {
            let index=Math.floor(Math.random()*(this.itemList.length-0)+0);
            console.log("index:",index);
            this.newName=this.itemList[index].momentName;
            this.showNewNameBlock(true);
            this.isRandom=true;
          }
        },
        created: function () {

        },
        mounted:function () {
          this.getPgcTime();
        },
    }


</script>
