<!--记录-->
<template>
    <div class="record-page">
      <div class="cm-panel">
         <div class="panel-hd">
           <i class="icon hd-icon married-sm-icon"></i>
         </div>
         <div class="panel-bd">
           <div class="content-block">
             <div class="block-hd">
               <span class="title">我的纪念日</span>
               <span class="cm-btn add-btn"><i class="icon box-icon"></i>添加纪念日</span>
             </div>
             <div class="block-bd">
               <table>
                 <thead>
                 <tr>
                   <td>名称</td>
                   <td>日期</td>
                   <td>提醒时间</td>
                   <td>提醒方式</td>
                   <td>接收提醒号码</td>
                   <td>操作</td>
                 </tr>
                 </thead>
                 <tbody>
                 <tr v-for="(item,index) in entryList">
                   <td><input type="text" v-model="item.name"></td>
                   <td>2018/1/1</td>
                   <td>提前两周</td>
                   <td>电话提醒</td>
                   <td>13765125875</td>
                   <td>
                    <!-- <span class="cm-btn handle-btn edit-btn">编辑</span>-->
                     <span class="cm-btn handle-btn del-btn">移除</span>
                   </td>
                 </tr>
                 </tbody>
               </table>
             </div>
           </div>
         </div>
       </div>
      <div class="page-footer"></div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>

<script>
    import Vue from 'vue'
    export default {
        components: {
        },
        data: function () {
            return {
              pager:{
                type:'noTotal',
                pageIndex: 1,
                pageSize: 20,
                isLoading:false,
                entryList:[],
              }
            }
        },
        computed: {
        },
        watch: {},
        methods: {
          getAnniversaryList:function (isInit) {
            if(isInit){
              this.pager.pageIndex=1;
              this.entryList=[];
            }
            let params={
              ...Vue.tools.sessionInfo(),
              pageNumber:this.pager.pageIndex,
              pageSize:this.pager.pageSize
            }
            Vue.api.getAnniversaryList(params).then((resp)=>{
              if(resp.respStatus=='success'){
                let data=JSON.parse(resp.respMsg);
                let list=data.result;
                this.pager.pageIndex=this.pager.pageIndex + 1;
                this.pager.resultLength=list.length;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.entryList=this.entryList.concat(list);
              }
            });
          }
        },
        created: function () {

        },
        mounted: function () {
          this.getAnniversaryList(true);
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
