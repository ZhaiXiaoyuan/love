<!--相册-->
<template>
    <div class="album-page">
       <div class="cm-panel album-panel" :class="{'edit-status':isEditAlbum}" v-if="pageType=='album'">
         <div class="panel-hd">
           <div class="handle-list">
             <div class="cm-btn handle-btn" @click="addAlbumDom()"><i class="icon add-icon"></i>新增相册</div>
             <div class="cm-btn handle-btn manage-btn" @click="toEditAlbum()"><i class="icon manage-icon"></i>管理相册</div>
             <div class="cm-btn handle-btn complete-btn" @click="toEditAlbum()"><i class="icon complete-handle-icon"></i>完成</div>
           </div>
          <!-- <span class="title">标题</span>-->
           <div class="storage">
             <div class="line"><div style="width: 60%;"></div></div>
             <span class="en-text">6G/10G</span>
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
      <div class="cm-panel detail-panel" v-if="pageType=='detail'">
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
                <div class="cm-btn btn">编辑</div>
                <div class="cm-btn btn">设为封面</div>
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
          toEditPic:function () {
            this.isEditPic=!this.isEditPic;
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
                //临时测试
              /*  that.selectAlbum(0);*/
              }else{

              }
            });
          },
          selectAlbum:function (index) {
            let that=this;
            that.selectedAlbum=that.albumList[index];
            if(!that.selectedAlbum.id){
              that.operationFeedback({type:'warn',text:'请先命名该相册'});
            }
            that.pageType='detail';
            that.getPicList();
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
            that.albumList.unshift(temAlbum);
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
                    console.log('reslult:',reslult);
                    Vue.api.addPic({...Vue.tools.sessionInfo(),albumId:that.selectedAlbum.id,file:params.file,size:file.size,remark:null}).then(function (resp) {
                      if(resp.respStatus=='success'){
                        uploadedCount++;
                        if(uploadedCount==files.length){
                          that.picList.unshift(JSON.parse(resp.respMsg));
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
          }
        },
        created: function () {

        },
        mounted: function () {
          let that=this;
          //
          this.getAlbumList();
          //临时测试
         /* this.addAlbum();*/
        /*  this.curAlbum={
            picList:[
              {
                url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519928970239&di=e85b54a4be6c3ca4b2f38ebd0f865b1e&imgtype=0&src=http%3A%2F%2Fwww.rswmh.com%2Ffile%2Fupload%2F201509%2F08%2F06-18-45-31-1.jpg"
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519928689903&di=fcc4acca897c9c3c07f3d7742f585dc4&imgtype=0&src=http%3A%2F%2Fpic50.nipic.com%2Ffile%2F20141015%2F4000944_091000928000_2.jpg',
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519928743671&di=f9813b069bc628779c20bedb81cccc1a&imgtype=0&src=http%3A%2F%2Fpic11.photophoto.cn%2F20090623%2F0036036858233594_b.jpg',
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519928762256&di=ddf339dd87e657fd6c62d3190ccfd8a0&imgtype=0&src=http%3A%2F%2Fimg16.3lian.com%2Fgif2016%2Fq8%2F16%2F29.jpg',
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519928781960&di=ffe15e23317c9c2b378324bac69251f3&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F120923%2F219049-12092315533788.jpg',
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519928814531&di=a6a4772887f43ec08321fbf3ac39e7ad&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D02c29a410323dd54357eaf2bb960d9ab%2F574e9258d109b3de5553024dc6bf6c81800a4c23.jpg',
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519928824823&di=6cf13d228efb7967c083099b2770eb0c&imgtype=0&src=http%3A%2F%2Fsc.jb51.net%2Fuploads%2Fallimg%2F130901%2F2-130Z1193403E6.jpg',
              },
              {
                url:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=510054660,3780388583&fm=200&gp=0.jpg',
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519928862297&di=70750495db69b9ea2723c557af637c8a&imgtype=0&src=http%3A%2F%2Fpic66.nipic.com%2Ffile%2F20150511%2F20797049_131942108000_2.jpg',
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519928900285&di=fc917030814179b1cbec8786ad393b00&imgtype=0&src=http%3A%2F%2Ff6.topitme.com%2F6%2F0f%2F3c%2F1124252145e373c0f6l.jpg',
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519928997386&di=8ebdd5f983ac31411ef0903d53e801a2&imgtype=0&src=http%3A%2F%2Fwww.hrbvenus.com%2Fuploadfile%2F2015%2F0810%2F20150810023828898.jpg',
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519929009084&di=d8aa06bde780c9be4bd90eeaa785d3ed&imgtype=0&src=http%3A%2F%2Fenjoy.eastday.com%2Fimages%2Fthumbnailimg%2Fmonth_1501%2F201501180914574570.jpg',
              },
              {
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519929019713&di=1f81ba6d0184c90861b7a3f2e5e76c27&imgtype=0&src=http%3A%2F%2Fimg.bjlmfq.com%2FUserEdit%2Fattached%2F2015221016203966281.jpg',
              },
            ]
          };*/

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
