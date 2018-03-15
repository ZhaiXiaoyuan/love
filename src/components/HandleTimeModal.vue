<!--新建或编辑时刻弹窗-->
<template>
  <div class="handle-time-modal">
    <div class="mask" @click="close()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <span class="cm-btn handle-btn return-btn" @click="close()">
          <i class="icon return-icon"></i>
          <span>返回</span>
        </span>
        <input type="text" class="title" v-model="title" placeholder="请输入时刻名称" maxlength="50">
        <span class="cm-btn handle-btn ok-btn" @click="complete()">
          <span>完成</span>
        </span>
      </div>
      <div class="modal-body">
        <div class="view-win">
          <div class="icon upload-img-icon upload-btn">
            <input type="file" @change="selectFile($event)"  accept="image/*">
          </div>
          <img id="time-img" :src="imgUrl" alt="">
        </div>
        <div class="date-wrap">
          <span class="label">时刻：</span>
          <el-date-picker
            v-model="date"
            type="date"
            :editable='false'
            :clearable="false"
            format="yyyy.MM.dd"
            placeholder="请选择">
          </el-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  .handle-time-modal{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 20;
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
    font-family: '宋体';
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .modal-content{
    position: fixed;
    width: 65%;
    height: 742px;
    background: #fff;
    border: 1px solid #e5e5e5;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
    padding: 20px;
    min-width: 900px;
    max-width: 1200px;
  }
  .modal-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .handle-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      text-align: center;
      border:1px solid #e5e5e5;
      border-radius: 5px;
      .icon{
        margin-right: 10px;
      }
      span{
        font-size: 16px;
        color: #b3b3b3;
      }
    }
    .return-btn{
      width: 80px;
    }
    .ok-btn{
      width: 60px;
    }
    .title{
      border:1px solid #e5e5e5;
      border-radius: 5px;
      height: 42px;
      font-size: 24px;
      font-family: '宋体';
      width: 30%;
      text-align: center;
      padding: 0px 20px;
      color: #b3b3b3;
    }
  }
  .modal-body{
    height: 100%;
    text-align: center;
  }
  .view-win{
    position: relative;
    margin: 20px 0px;
    width: 100%;
    height: 75%;
    .upload-btn{
      position: absolute;
      top:0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: auto;
      input{
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
      }
    }
    img{
      position: absolute;
      top:0px;
      bottom: 0px;
      max-width: 100%;
      height: 100%;
      left: 0px;
      right: 0px;
      margin: auto;
    }
  }
  .date-wrap{
    display: inline-block;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0rem 20px;
    .label{
      font-size: 20px;
      color: #b3b3b3;
    }
    .el-input__prefix{
      display: none;
    }
    .el-date-editor{
      width: 100px !important;
    }
    input{
      border: none;
      outline: none;
      padding: 0px !important;
      font-size: 20px;
      height: 40px;
      color: #b3b3b3;
      font-family: '宋体';
      cursor: pointer;
    }
  }
  @media screen and(max-width: 1600px) {
    .modal-content{
      height: 640px;
    }
  }
</style>

<script>
    import Vue from 'vue'
    import * as qiniu from 'qiniu-js'

    export default {
        props: {
          options:{
            type:Object,
            default:()=>{
              return{
                type:'add',
                id:null,
                name:null,
                ok:()=>{},
                cancel:()=>{}
              }
            }
          }
        },
        data:function () {
          return {
            time:null,
            date:Vue.tools.formatDate(new Date(),'yyyy.MM.dd'),
            imgUrl:null,
            file:null,
            title:this.options.name
          }
        },
        methods:{
          close:function () {
            this.$el.remove();
            this.$destroy();
          },
          getTime:function () {
            Vue.api.getTime({...Vue.tools.sessionInfo(),momentId:this.options.id}).then((resp)=>{
              if(resp.respStatus=='success'){

              }
            })
          },
          selectFile:function ($event) {
            let that=this;
            that.file=Vue.tools.getCurEle($event).files[0];
            //创建读取文件的对象
            var reader = new FileReader();

            //创建文件读取相关的变量
            var imgFile;
            //为文件读取成功设置事件
            reader.onload=function(e) {
              imgFile = e.target.result;
              that.imgUrl=imgFile;
            };
            //正式读取文件
            reader.readAsDataURL(that.file);
          },
          addTime:function () {
            let that=this;
            let sessionInfo=Vue.tools.sessionInfo();
            if(!this.title||this.title==''){
              this.operationFeedback({type:'warn',text:'请输入时刻名称'});
              return;
            }
            if(!this.file){
              this.operationFeedback({type:'warn',text:'请选择要上传的图片文件'});
              return;
            }
            if(!this.date){
              this.operationFeedback({type:'warn',text:'请选择时刻日期'});
              return;
            }
            if(typeof this.date=='object'){
              this.date=Vue.tools.formatDate(this.date,'yyyy.MM.dd');
            }
            let params={
              ...sessionInfo,
              bucket:'only.love.moment.bucket',
              file:sessionInfo.domainId+'-moment-'+sessionInfo.timeStamp+'.'+that.file.type.split('/')[1]
            }
            let fb=this.operationFeedback({text:'创建中，请耐心等待',mask:false});
            Vue.api.getUploadKey(params).then(function (resp) {
              if(resp.respStatus=='success'){
                var observable = qiniu.upload(that.file, params.file, resp.respMsg, {fname: that.file.name, params: {}, mimeType: [] || null
                }, {useCdnDomain: true, region: qiniu.region.z2});
                var subscription = observable.subscribe(function (data) {
                }, function (error) {
                }, function (reslult) {//上传成功
                  Vue.api.newTime({
                    ...sessionInfo,
                    file:params.file,
                    title:that.title,
                    time:new Date(that.date.replace('.','/')).getTime()/1000,
                   /* time:sessionInfo.timeStamp,*/
                    permission:'private'
                  }).then((resp)=>{
                    if(resp.respStatus=='success'){
                      Vue.api.delWaitingTime({...Vue.tools.sessionInfo(),momentName:that.title}).then(function (resp) {
                        if(resp.respStatus=='success'){
                          that.options.ok&&that.options.ok();
                          fb.setOptions({type:'complete',text:'创建成功'});
                          that.close();
                        }
                      });
                    }else{

                    }
                  });
                })
              }else{

              }
            });
          },
          complete:function () {
            if(this.options.type=='add'){
              this.addTime();
            }
          }
        },
        created: function () {

        },
        mounted:function () {
          /**
           * 新增时刻
           */
          if(this.options.type=='add'){
            this.title=this.options.name;
          }

        },
    }


</script>
