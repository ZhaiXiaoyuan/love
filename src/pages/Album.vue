<!--相册-->
<template>
    <div class="album-page">
       <div class="cm-panel album-panel" :class="{'edit-status':isEditAlbum}" v-if="!curAlbum">
         <div class="panel-hd">
           <div class="handle-list">
             <div class="cm-btn handle-btn"><i class="icon add-icon"></i>新增相册</div>
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
             <li v-for="entry in albumList" :class="{'new':!entry.cover}">
              <div class="entry-bd">
                <div class="cover" :style="{background: 'url('+entry.cover+') no-repeat center',backgroundSize: 'cover'}">
                  <i class="icon heart-icon" v-if="!entry.cover"></i>
                </div>
                <p class="title">
                  <span>{{entry.name}}</span>
                  <input type="text" placeholder="点击输入相册名字" v-model="entry.name">
                </p>
                <p class="count"><span class="en-text">{{entry.count}}</span>张</p>
              </div>
               <div class="entry-ft">
                 <div class="cm-btn handle-btn edit-name-btn">
                   <div>
                     <i class="icon pen-icon"></i>
                   </div>
                   <p>重命名</p>
                 </div>
                 <div class="cm-btn handle-btn del-btn">
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
      <div class="cm-panel detail-panel" v-if="curAlbum">
        <div class="panel-hd">
          <div class="handle-list">
            <div class="cm-btn handle-btn"><i class="icon add-icon"></i>上传照片/视频</div>
            <div class="cm-btn handle-btn manage-btn" @click="toEditPic()"><i class="icon manage-icon"></i>管理相册</div>
            <div class="cm-btn handle-btn complete-btn" @click="toEditAlbum()"><i class="icon more-icon"></i>更多</div>
          </div>
           <span class="title">标题</span>
          <i class="icon hd-icon married-sm-icon"></i>
        </div>
        <div class="panel-bd">
          <div v-for="n in 4">
            <div class="item" v-for="(item,index) in curAlbum.picList" v-if="index%4==n-1">
              <img :src="item.url" alt="">
              <div class="cm-btn del-btn"><i class="icon del-grey-icon "></i></div>
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
    export default {
        components: {
        },
        data: function () {
            return {
              curAlbum:null,
              albumList:[{cover:require('../images/common/example-picture.jpg'),name:'婚礼',count:368}],
              isEditAlbum:false,
              isEditPic:false,
            }
        },
        computed: {
          colPicList: function (colIndex) {
            return this.curAlbum.picList.filter(function (index) {
              return index%4===colIndex
            })
          }
        },
        watch: {},
        methods: {
          toEditAlbum:function () {
            this.isEditAlbum=!this.isEditAlbum;
          },
          toEditPic:function () {
            this.isEditPic=!this.isEditPic;
          },
          getAlbumList:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              pageNumber:1,
              pageSize:2
            }
            Vue.api.getAlbumList(params).then(function (resp) {
              if(resp.respStatus=='success'){

              }
            });
          },
          addAlbum:function () {
            let that=this;
            that.albumList.unshift({cover:null,name:null,count:0});
            let params={
              ...Vue.tools.sessionInfo(),
              name:null,
              cover:null
            }
            Vue.api.addAlbum(params).then(function (resp) {
              if(resp.resultStatus=='success'){

              }else{

              }
            });
          },
          getUploadKey:function () {
            let sessionInfo=Vue.tools.sessionInfo();
            let params={
              ...sessionInfo,
              bucket:'only.love.ablum.bucket',
              file:sessionInfo.domainId+'-album-'+sessionInfo.timeStamp+'.png'
            }
            Vue.api.getUploadKey(params).then(function (resp) {
              if(resp.resultStatus=='success'){

              }else{

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
          this.curAlbum={
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
          };

          setTimeout(function () {
            that.curAlbum.picList=that.curAlbum.picList.concat(that.curAlbum.picList);
          },5000);


          /**/
          this.getUploadKey();
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
