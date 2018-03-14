<!--相册-->
<template>
    <div class="album-page">
      <div class="cm-panel album-panel" :class="{'edit-status':isEditAlbum}">
         <div class="panel-hd">
           <div class="handle-list">
             <div class="cm-btn handle-btn" @click="addAlbumDom()"><i class="icon add-icon"></i>新增相册</div>
             <div class="cm-btn handle-btn manage-btn" @click="toEditAlbum()"><i class="icon manage-icon"></i>管理相册</div>
             <div class="cm-btn handle-btn complete-btn" @click="toEditAlbum()"><i class="icon complete-handle-icon"></i>完成</div>
           </div>
          <!-- <span class="title">标题</span>-->
           <div class="storage">
             <div class="line"><div :style="{width:((usedStorage/totalStorage)*100)+'%'}"></div></div>
             <span class="en-text">{{usedStorage}}G/{{totalStorage}}G</span>
           </div>
           <i class="icon hd-icon married-sm-icon"></i>
         </div>
         <div class="panel-bd">
           <ul class="entry-list">
             <li v-for="(entry,index) in albumList" :class="{'new':curAlbum&&curAlbum.new,'edit':curAlbum&&curAlbum.id==entry.id}" :key="entry.id">
              <div class="entry-bd">
                <div class="cover" :style="{background: 'url('+entry.cover+') no-repeat center',backgroundSize: 'cover'}" @click="selectAlbum(index)">
                  <i class="icon heart-icon" v-if="!entry.cover"></i>
                </div>
                <p class="title">
                  <span>{{entry.name}}</span>
                  <input type="text" placeholder="点击输入相册名字" @keyup.enter="addAlbum();saveAlbumName()" v-input-focus="curAlbum&&(curAlbum.id==entry.id)" v-model="entry.name">
                </p>
                <p class="count"><span class="en-text">{{entry.contentCount}}</span>张</p>
              </div>
               <div class="entry-ft">
                 <div class="cm-btn handle-btn edit-name-btn" @click="toRenameAlbum(index)">
                   <div>
                     <i class="icon pen-icon"></i>
                   </div>
                   <p>重命名</p>
                 </div>
                 <div class="cm-btn handle-btn del-btn" @click="delAlbum(index)">
                   <div>
                     <i class="icon del-icon"></i>
                   </div>
                   <p>删除</p>
                 </div>
               </div>
             </li>
           </ul>
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
              curAlbum:null,
              selectedAlbum:null,
              albumList:[],
              isEditAlbum:false,
              usedStorage:0,
              totalStorage:5,
            }
        },
        computed: {
        },
        watch: {},
        methods: {
          toEditAlbum:function () {
            this.curAlbum=null;
            this.isEditAlbum=!this.isEditAlbum;
          },
          getRestSpace:function () {
            Vue.api.getRestSpace({...Vue.tools.sessionInfo(),bucket:'only.love.album.bucket'}).then((resp)=>{
              if(resp.respStatus=='success'){
                let data=JSON.parse(resp.respMsg);
                this.usedStorage=(data.totleFilesize/(1024*1024)).toFixed(2);
              }
            });
          },
          getAlbumList:function () {
            let that=this;
            let params={
              ...Vue.tools.sessionInfo(),
              pageNumber:1,
              pageSize:20
            }
            Vue.api.getAlbumList(params).then(function (resp) {
              if(resp.respStatus=='success'){
                let data=JSON.parse(resp.respMsg);
                that.albumList=that.albumList.concat(data.result);
              }else{

              }
            });
          },
          selectAlbum:function (index) {
            let that=this;
            that.selectedAlbum=that.albumList[index];
            if(!that.selectedAlbum.id){
              that.operationFeedback({type:'warn',text:'请先命名该相册'});
            }else{
             /* this.$router.push({name:'album',params:{id:that.selectedAlbum.id}});*/
              this.$router.push({path: `/album/${that.selectedAlbum.id}`});
            }
          },
          addAlbumDom:function () {
            let that=this;
            if(that.curAlbum&&!that.curAlbum.id){
              that.operationFeedback({type:'warn',text:'您还有未创建完成的相册，请输入相册名称完成创建！'});
              return;
            }
            let temAlbum={
              name:null,
              cover:null,
              contentCount:0,
              new:true
            };
            that.albumList.push(temAlbum);
            that.curAlbum=temAlbum;
          },
          addAlbum:function () {
            let that=this;
            //如果不是新添加的相册，则中断函数
            if(!that.curAlbum.new){
              return
            }
            //
            if(!that.curAlbum.name||that.curAlbum.name.length==0||that.curAlbum.name.length>50){
              that.operationFeedback({type:'warn',text:'请输入相册名称，长度限制在50个字符以内！'});
              return;
            }
            let params={
              ...Vue.tools.sessionInfo(),
              ...that.curAlbum
            }
            let fb=that.operationFeedback({text:'创建中...'});
            Vue.api.addAlbum(params).then(function (resp) {
              if(resp.respStatus=='success'){
                let data=JSON.parse(resp.respMsg);
                that.curAlbum.id=data.id;
                that.curAlbum=Object.assign({}, that.curAlbum,...data);
                Vue.set(that.curAlbum,'new',false);
                fb.setOptions({type:'complete',text:'创建成功'});
                console.log('that.curAlbum:',that.curAlbum.new);
                that.curAlbum=null;
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            });
          },
          delAlbum:function (index) {
            console.log('tsdfs')
            let that=this;
            let params={
              ...Vue.tools.sessionInfo(),
              id:that.albumList[index].id
            }
            let fb=that.operationFeedback({text:'删除中...'});
            //如果是新添加的还没保存到数据库的相册，则不用请求接口，直接删除dom
            if(!that.albumList[index].id){
              fb.setOptions({type:'complete',text:'删除成功'});
              return;
            }
            //
            Vue.api.delAlbum(params).then(function (resp) {
              if(resp.respStatus=='success'){
                that.albumList.splice(index,1);
                fb.setOptions({type:'complete',text:'删除成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            });
          },
          toRenameAlbum:function (index) {
            let that=this;
            that.curAlbum=that.albumList[index];
          },
          saveAlbumName:function () {
            let that=this;
            //如果相册不是处于编辑状态，则中断函数
            if(!that.isEditAlbum||!that.curAlbum.id){
              return;
            }
            if(!that.curAlbum.name||that.curAlbum.name.length==0||that.curAlbum.name.length>50){
              that.operationFeedback({type:'warn',text:'请输入相册名称，长度限制在50个字符以内！'});
              return;
            }
            let params={
              ...Vue.tools.sessionInfo(),
              id:that.curAlbum.id,
              name:that.curAlbum.name
            }
            let fb=that.operationFeedback({text:'保存中...'})
            Vue.api.updAlbumName(params).then(function (resp) {
              if(resp.respStatus){
                //此处必须用set方法来修改值才能刷新dom
                Vue.set(album,'edit',false);
                fb.setOptions({type:'complete',text:'保存成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            });
          },
        },
        created: function () {

        },
        mounted: function () {
          //
          this.getRestSpace();
          //
          this.getAlbumList();

          /**/
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
