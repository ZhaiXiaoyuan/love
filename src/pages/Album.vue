<!--相册-->
<template>
    <div class="album-page">
       <div class="cm-panel album-panel" :class="{'edit-status':isEditAlbum}" v-if="!curAlbumId">
         <div class="panel-hd">
           <div class="handle-list">
             <div class="cm-btn handle-btn"><i class="icon add-icon"></i>新增相册</div>
             <div class="cm-btn handle-btn manage-btn" @click="toEditAlbum()"><i class="icon manage-icon"></i>管理相册</div>
             <div class="cm-btn handle-btn complete-btn" @click="toEditAlbum()"><i class="icon complete-icon"></i>完成</div>
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
             <li v-for="entry in albumList">
              <div class="entry-bd">
                <div class="cover" :style="{background: 'url('+coverPic+') no-repeat center',backgroundSize: 'cover'}"></div>
                <p class="title">婚礼</p>
                <p class="count"><span class="en-text">368</span>张</p>
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
      <div class="cm-panel detail-panel" v-if="curAlbumId">

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
              curAlbumId:null,
              coverPic:require('../images/common/example-picture.jpg'),
              albumList:[1,2,3,4,5,6,7,8,9],
              isEditAlbum:false,
            }
        },
        computed: {},
        watch: {},
        methods: {
          toEditAlbum:function () {
            this.isEditAlbum=!this.isEditAlbum;
          }
        },
        created: function () {
        /*  Vue.api.homePageData().then(function (resp) {

          });*/
        function testing() {
          console.log('');
        }
        },
        mounted: function () {

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
