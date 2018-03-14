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
            <div class="cm-btn handle-btn manage-btn" @click="toEditPic()"><i class="icon manage-icon"></i>批量管理</div>
            <div class="cm-btn handle-btn complete-btn" @click="toEditAlbum()"><i class="icon more-icon"></i>更多</div>
          </div>
           <span class="title" v-if="selectedAlbum">{{selectedAlbum.name}}</span>
          <i class="icon hd-icon married-sm-icon"></i>
        </div>
        <div class="panel-bd">
          <div v-for="n in 4">
            <div class="item" v-for="(item,index) in picList" v-if="index%4==n-1" :key="item.id">
              <img :src="item.file" alt="">
              <div class="cm-btn del-btn" @click="delPic(index)"><i class="icon del-grey-icon "></i></div>
              <div class="handle">
              <!--  <div class="cm-btn btn">编辑</div>-->
                <div class="cm-btn btn" @click="setCover(index)">设为封面</div>
              </div>
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
    import * as qiniu from 'qiniu-js'
    export default {
        components: {
        },
        data: function () {
            return {
              pageType:'album',
              curAlbum:null,
              selectedAlbum:null,
            /*  albumList:[{cover:require('../images/common/example-picture.jpg'),name:'婚礼',contentCount:368}],*/
              albumList:[],
              picList:[],
              isEditAlbum:false,
              isEditPic:false,
              usedStorage:0,
              totalStorage:5,
            }
        },
        computed: {
        },
        watch: {},
        methods: {
          toEditPic:function () {
            this.isEditPic=!this.isEditPic;
          },
          getRestSpace:function () {
            Vue.api.getRestSpace({...Vue.tools.sessionInfo(),bucket:'only.love.album.bucket'}).then((resp)=>{
              if(resp.respStatus=='success'){
                let data=JSON.parse(resp.respMsg);
                this.usedStorage=(data.totleFilesize/(1024*1024)).toFixed(2);
              }
            });
          },
          selectFile:function () {
            let that=this;
            let files=document.getElementById('album-file-input').files;
            let fb=this.operationFeedback({text:'上传中，请耐心等待',mask:true});
            let uploadedCount=0;
            for(let i=0;i<files.length;i++){
              let file=files[i];
              let sessionInfo=Vue.tools.sessionInfo();
              let params={
                ...sessionInfo,
                bucket:'only.love.album.bucket',
                file:sessionInfo.domainId+'-album-'+sessionInfo.timeStamp+'.'+file.type.split('/')[1]
              }
              Vue.api.getUploadKey(params).then(function (resp) {
                if(resp.respStatus=='success'){
                  var observable = qiniu.upload(file, params.file, resp.respMsg, {fname: file.name, params: {}, mimeType: [] || null
                  }, {useCdnDomain: true, region: qiniu.region.z2});
                  var subscription = observable.subscribe(function (data) {
                  }, function (error) {
                  }, function (reslult) {//上传成功
                    Vue.api.addPic({...Vue.tools.sessionInfo(),albumId:that.selectedAlbum.id,file:params.file,size:file.size,remark:null}).then(function (resp) {
                      if(resp.respStatus=='success'){
                        uploadedCount++;
                        if(uploadedCount==files.length){
                          if(that.picList.length==0){//如果是该相册的第一张图，则调度接口设置默认封面
                            Vue.api.setDefCover({...Vue.tools.sessionInfo(),albumId:that.selectedAlbum.id});
                          }
                          that.picList.push(JSON.parse(resp.respMsg));
                          fb.setOptions({type:'complete',text:'上传成功'});
                        }
                      }else{

                      }
                    });
                 /*   console.log('reslult:',reslult);*/
                  })
                }else{

                }
              });
            }
          },
          getPicList:function () {
            let that=this;
            let params={
              ...Vue.tools.sessionInfo(),
              albumId:that.selectedAlbum.id,
              pageNumber:1,
              pageSize:20
            }
            Vue.api.getPicList(params).then(function (resp) {
              if(resp.respStatus=='success'){
                let data=JSON.parse(resp.respMsg);
                that.picList=that.picList.concat(data.result);
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
            let fb=that.operationFeedback({text:'删除中...'});
            Vue.api.delPic(params).then(function (resp) {
              if(resp.respStatus=='success'){
                that.picList.splice(index,1);
                fb.setOptions({type:'complete',text:'删除成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
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
          }
        },
        created: function () {

        },
        mounted: function () {
          let that=this;
          //
          this.getRestSpace();
          //

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
