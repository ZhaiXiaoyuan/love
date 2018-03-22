<!--时刻-->
<template>
    <div class="time-page">
      <div class="cm-panel time-panel">
         <div class="panel-hd">
           <div class="handle-list">
             <div class="cm-btn handle-btn">
               <i class="icon sort-icon"></i>排序
             </div>
             <div class="cm-btn-block">
               <div class="cm-btn btn">按时刻排序</div>
               <div class="cm-btn btn">按创建时间排序</div>
             </div>
           </div>
           <span class="title">时刻</span>
           <i class="icon hd-icon married-sm-icon"></i>
         </div>
         <div class="panel-bd">
           <ul class="entry-list">
             <li class="entry" v-for="(entry,index) in timeList">
               <div class="entry-content">
                 <div class="cover" :style="{background: 'url('+entry.authUrl+') no-repeat center',backgroundSize: 'cover'}">
                   <div class="handle">
                     <div class="cm-btn btn" @click="editTime(index)">编辑</div>
                     <div class="cm-btn btn" @click="delTime(index)">删除</div>
                   </div>
                 </div>
                 <div class="info">
                   <p class="title">{{entry.title}}</p>
                   <p class="time">时刻：<em>{{entry.time|formatDate('yyyy.MM.dd')}}</em></p>
                   <p class="created-date">创建时间：<em>{{entry.createdAt|formatDate('yyyy.MM.dd')}}</em></p>
                 </div>
               </div>
             </li>
           </ul>
           <scroll-load :page="pager" @scrolling="getTimeList()"></scroll-load>
         </div>
       </div>
      <div class="page-footer"></div>
      <div class="cm-btn new-btn" @click="toggleWaitingPanel($event)">
        <span class="icon-wrap"><i class="icon heart-min-icon"></i></span>
        <p>新的时刻</p>
      </div>
      <div class="time-queue-panel waiting-panel" v-if="waitingPanelFlag">
        <div class="panel-header">
          等待中
        </div>
        <div class="panel-body cm-scroll">
          <ul>
            <li class="cm-btn" v-for="(item,index) in waitingList" @click="addTime(index)">{{item.momentName}}</li >
          </ul>
        </div>
        <div class="panel-footer">
          <i class="icon add-lg-icon cm-btn add-btn" @click="addWaiting()"></i>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>

<script>
    import Vue from 'vue'
    import * as qiniu from 'qiniu-js'
    export default {
        components: {
        },
        data: function () {
            return {
              timeList:[],
              sort:'DESC',//排序方式，DESC，ASC
              sortField:'time',//排序字段，time,createdAt
              waitingPanelFlag:false,
              waitingList:[],
              targetTime:null,
              pager:{
                type:'noTotal',
                pageIndex: 1,
                pageSize: 5,
                isLoading:false
              }
            }
        },
        computed: {
        },
        watch: {},
        methods: {
          getTimeList:function (isInit) {
            let that=this;
            if(isInit){
              if(isInit){
                this.pager.pageNum = 1;
                this.timeList = [];
              }
            }
            let params={
              ...Vue.tools.sessionInfo(),
              sort:this.sort,
              field:this.sortField,
              pageIndex:this.pager.pageIndex,
              pageSize:this.pager.pageSize
            }
            this.pager.isLoading = true;
            Vue.api.getTimeList(params).then((resp)=>{
              let list=JSON.parse(resp.respMsg);
              if(resp.respStatus=='success'){
                this.pager.pageIndex=this.pager.pageIndex + 1;
                this.pager.resultLength=list.length;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.timeList=this.timeList.concat(list);
              }else{

              }
            })
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
          toggleWaitingPanel:function ($event,flag) {
            Vue.tools.stopPropagation($event);
            this.waitingPanelFlag=typeof flag=='boolean'?flag:!this.waitingPanelFlag;
            this.getWaitingTime();
          },
          addTime:function (index) {
            this.handleTimeModal({
              type:'add',
              name:this.waitingList[index].momentName,
              ok:()=>{
                this.waitingList.splice(index,1);
                this.getTimeList(true);
              }
            });
          },
          addWaiting:function () {
            this.addTimeModal({
              waitingList:this.waitingList,
              ok:()=>{

              }
            });
          },
          delTime:function (index) {
            var time=this.timeList[index];
            this.confirm({
              html:'<div>确定删除<em style="color:#368df3;">'+time.title+'</em>时刻?</div>',
              ok:()=>{
                let params={
                  ...Vue.tools.sessionInfo(),
                  momentId:time.id
                }
                let fb=this.operationFeedback({text:'删除中...'});
                Vue.api.delTime(params).then((resp)=>{
                  if(resp.respStatus=='success'){
                    this.timeList.splice(index,1);
                    fb.setOptions({type:'complete',text:'删除成功'});
                  }else{
                    fb.setOptions({type:'warn',text:resp.respMsg});
                  }
                })
              }
            });
          },
          editTime:function (index) {
            let time=this.timeList[index];
            this.handleTimeModal({
              type:'edit',
              entry:time,
              ok:(data)=>{

              }
            });
          }
        },
        created: function () {

        },
        mounted: function () {
          this.getTimeList(true);
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
