<!--相册-->
<template>
    <div class="album-page">
      <div class="cm-panel detail-panel">
        <div class="panel-hd">
          <div class="handle-list">
            <div class="cm-btn handle-btn upload-btn">
              <i class="icon add-icon"></i>上传照片/视频
              <input type="file" id="album-file-input" multiple @change="selectFile()">
            </div>
            <!--功能待定-->
            <!--<div class="cm-btn handle-btn manage-btn" @click="toEditPic()"><i class="icon manage-icon"></i>批量管理</div>-->
            <div class="cm-btn handle-btn" @click="moreHandleBlockFlag=!moreHandleBlockFlag">
              <i class="icon more-icon"></i>更多
              <div class="cm-btn-block  more-handle-block" v-if="moreHandleBlockFlag">
                <div class="cm-btn btn">分享</div>
                <div class="cm-btn btn" @click="delAlbum()">删除相册</div>
              </div>
            </div>
          </div>
           <span class="title" v-if="selectedAlbum">{{selectedAlbum.name}}</span>
          <i class="icon hd-icon married-sm-icon"></i>
        </div>
        <div class="panel-bd">
          <div v-for="n in 4">
            <div class="item" v-for="(item,index) in picList" v-if="index%4==n-1" :key="item.id" @click="viewPicModal(picList,index)">
              <img :src="item.file" alt="">
              <div class="top-handle">
                <div class="cm-btn btn" @click="setIndexBg(index)">首页<br>背景</div>
                <div class="cm-btn btn" @click="setLoginBg(index)">登录<br>背景</div>
                <div class="cm-btn btn del-btn" @click="delPic(index)"><i class="icon del-grey-icon "></i></div>
              </div>
              <div class="handle">
              <!--  <div class="cm-btn btn">编辑</div>-->
                <div class="cm-btn btn" @click="setCover(index)">设为封面</div>
              </div>
            </div>
          </div>
          <scroll-load :page="pager" @scrolling="getPicList()"></scroll-load>
        </div>
      </div>
      <div class="page-footer"></div>
      <view-pic-modal></view-pic-modal>
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
              selectedAlbum:null,
              picList:[],
              isEditPic:false,
              usedStorage:0,
              totalStorage:5,
              pager:{
                type:'noTotal',
                pageIndex: 1,
                pageSize: 20,
                isLoading:false
              },
              uploadFb:null,
              uploadedCount:0,
              files:[],
              moreHandleBlockFlag:false,
            }
        },
        computed: {
        },
        watch: {},
        methods: {
          getAlbumInfo:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              id:this.$route.params.id
            }
            Vue.api.getAlbumInfo(params).then((resp)=>{
              if(resp.respStatus=='success'){
                this.selectedAlbum=JSON.parse(resp.respMsg);
              }
            });
          },
          toEditPic:function () {
            this.isEditPic=!this.isEditPic;
          },
          selectFile:function () {
            let that=this;
            this.files=document.getElementById('album-file-input').files;
            this.uploadFb=this.operationFeedback({text:'上传中，请耐心等待',mask:true});
            this.uploadedCount=0;
            let index=0;
            let uploadInterval=setInterval(()=>{
              if(index==this.files.length){
                clearInterval(uploadInterval);
                return;
              }
              this.upload(this.files[index]);
              index++;
            },1000);
          },
          upload:function (file) {
            let that=this;
            let sessionInfo=Vue.tools.sessionInfo();
            let params={
              ...sessionInfo,
              bucket:'only.love.album.bucket',
              file:sessionInfo.domainId+'-album-'+sessionInfo.timeStamp+'.'+file.type.split('/')[1]
            }
            Vue.api.getUploadKey(params).then((resp)=>{
              if(resp.respStatus=='success'){
                var observable = qiniu.upload(file, params.file, resp.respMsg, {fname: file.name, params: {}, mimeType: [] || null
                }, {useCdnDomain: true, region: qiniu.region.z2});
                var subscription = observable.subscribe(function (data) {
                }, function (error) {
                }, function (reslult) {//上传成功
                  Vue.api.addPic({...Vue.tools.sessionInfo(),albumId:that.selectedAlbum.id,file:params.file,size:file.size,remark:null}).then(function (resp) {
                    if(resp.respStatus=='success'){
                      that.uploadedCount++;
                      if(that.uploadedCount==that.files.length){
                        if(that.picList.length==0){//如果是该相册的第一张图，则调度接口设置默认封面
                          Vue.api.setDefCover({...Vue.tools.sessionInfo(),albumId:that.selectedAlbum.id});
                        }
                        that.uploadFb.setOptions({type:'complete',text:'上传成功'});
                      }
                      that.picList.push(JSON.parse(resp.respMsg));
                    }else{

                    }
                  });
                })
              }else{

              }
            });
          },
          getPicList:function (isInit) {
            if(isInit){
              this.pager.pageIndex = 1;
              this.picList = [];
            }
            let that=this;
            let params={
              ...Vue.tools.sessionInfo(),
              albumId:this.$route.params.id,
              pageNumber:this.pager.pageIndex,
              pageSize:this.pager.pageSize
            }
            Vue.api.getPicList(params).then(function (resp) {
              if(resp.respStatus=='success'){
                let data=JSON.parse(resp.respMsg);
                let list=data.result;
                that.pager.pageIndex=that.pager.pageIndex + 1;
                that.pager.resultLength=list.length;
                that.pager.isLoading=false;
                that.pager.isFinished=false;
                that.picList=that.picList.concat(list);
              }else{

              }
            });
          },
          delPic:function (index) {
            let that=this;
            let params={
              ...Vue.tools.sessionInfo(),
              id:that.picList[index].id
            }
            this.verifyModal({
              title:'确定删除该照片？',
              ok:()=>{
                let fb=that.operationFeedback({text:'删除中...'});
                Vue.api.delPic(params).then(function (resp) {
                  if(resp.respStatus=='success'){
                    that.picList.splice(index,1);
                    fb.setOptions({type:'complete',text:'删除成功'});
                  }else{
                    fb.setOptions({type:'warn',text:resp.respMsg});
                  }
                });
              }
            });
          },
          setCover:function (index) {
            let params={
              ...Vue.tools.sessionInfo(),
              id:this.picList[index].id,
              albumId:this.selectedAlbum.id
            }
            let fb=this.operationFeedback({text:'设置中...'});
            Vue.api.setCover(params).then((resp)=>{
              if(resp.respStatus=='success'){
                fb.setOptions({type:'complete',text:'设置成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            })
          },
          delAlbum:function () {
            let that=this;
            let params={
              ...Vue.tools.sessionInfo(),
              id:this.selectedAlbum.id
            }
            let fb=that.operationFeedback({text:'删除中...'});
            //
            Vue.api.delAlbum(params).then(function (resp) {
              if(resp.respStatus=='success'){
                fb.setOptions({type:'complete',text:'删除成功'});
                setTimeout(()=>{
                  this.$router.replace('/album');
                },1000);
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            });
          },
          setIndexBg:function (index) {
            let params={
              ...Vue.tools.sessionInfo(),
              bucket:'only.love.album.bucket',
              id:this.picList[index].id,
            }
            let fb=this.operationFeedback({text:'设置中...'});
            Vue.api.setIndexBg(params).then((resp)=>{
              if(resp.respStatus=='success'){
                fb.setOptions({type:'complete',text:'设置成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            })
          },
          setLoginBg:function (index) {
            let params={
              ...Vue.tools.sessionInfo(),
              bucket:'only.love.album.bucket',
              id:this.picList[index].id,
            }
            let fb=this.operationFeedback({text:'设置中...'});
            Vue.api.setLoginBg(params).then((resp)=>{
              if(resp.respStatus=='success'){
                fb.setOptions({type:'complete',text:'设置成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            })
          },
          viewPicModal:function (list,curIndex) {

          }
        },
        created: function () {

        },
        mounted: function () {
          //
          this.getAlbumInfo();
          //
          this.getPicList(true);
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
          afterEach:()=>{
            console.log(23234);
          }
        }

    };
</script>
