<!--时刻-->
<template>
    <div class="time-page">
      <div class="cm-panel time-panel">
         <div class="panel-hd">
           <div class="handle-list">
             <div class="cm-btn handle-btn"><i class="icon sort-icon"></i>排序</div>
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
                     <div class="cm-btn btn">编辑</div>
                     <div class="cm-btn btn">删除</div>
                   </div>
                 </div>
                 <div class="info">
                   <p class="title">{{entry.title}}</p>
                   <p class="time">时刻：<em>{{entry.time|formatDate('yyyy.MM.dd')}}</em></p>
                   <p class="created-date">创建时间：<em>2017.1.12</em></p>
                 </div>
               </div>
             </li>
           </ul>
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
            <li class="cm-btn" v-for="(item,index) in waitingList" @click="showHandleTimeModal(index)">{{item.momentName}}</li >
          </ul>
        </div>
        <div class="panel-footer">
          <i class="icon add-lg-icon cm-btn add-btn"></i>
        </div>
      </div>
      <add-time-modal v-if="false"></add-time-modal>
    <!--  <handle-time-modal></handle-time-modal>-->
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
            }
        },
        computed: {
        },
        watch: {},
        methods: {
          getTimeList:function () {
            let that=this;
            let params={
              ...Vue.tools.sessionInfo(),
              sort:this.sort,
              field:this.sortField,
              pageIndex:1,
              pageSize:20
            }
            Vue.api.getTimeList(params).then((resp)=>{
              if(resp.respStatus=='success'){
                this.timeList=this.timeList.concat(JSON.parse(resp.respMsg));
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
                this.addTime(0);//临时测试
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

              }
            });
          }
        },
        created: function () {

        },
        mounted: function () {
          let that=this;
          this.getTimeList();
          //临时测试
       /*   this.toggleWaitingPanel();*/
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
