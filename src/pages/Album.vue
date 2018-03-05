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
      </div>
      <div class="page-footer"></div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

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
        computed: {},
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
          }
        },
        created: function () {

        },
        mounted: function () {
          //
          this.getAlbumList();
          //临时测试
          this.addAlbum();
          this.curAlbum=this.albumList[1];
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
