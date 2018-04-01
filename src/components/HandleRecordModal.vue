<!--新建或编辑纪念日弹窗-->
<template>
  <div class="handle-record-modal" :class="{'edit':options.type=='edit'}">
    <div class="mask" @click="close()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <span class="cm-btn handle-btn return-btn" @click="close()">
          <i class="icon return-icon"></i>
          <span>返回</span>
        </span>
        <span class="cm-btn handle-btn ok-btn" @click="complete()">
          <span>完成</span>
        </span>
      </div>
      <div class="modal-body">
        <div class="form">
          <div class="input-row">
            <span class="label">名称</span>
            <input type="text" v-model="name" placeholder="请输入名称" maxlength="50">
          </div>
          <div class="input-row date-row">
            <span class="label">日期</span>
            <el-date-picker id="date"
              v-model="date"
              type="date"
              :editable='false'
              :clearable="false"
              format="yyyy-MM-dd"
              placeholder="请选择">
            </el-date-picker>
          </div>
          <div class="input-row">
            <span class="label">提醒时间</span>
            <el-date-picker id="remindTime"
              v-model="remindTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择">
            </el-date-picker>
          </div>
          <div class="input-row">
            <span class="label">提醒方式</span>
            <el-radio v-model="remindMethod" label="短信">短信</el-radio>
            <el-radio v-model="remindMethod" label="电话">电话</el-radio>
          </div>
          <div class="input-row">
            <span class="label">接收提醒号码</span>
            <input type="tel" v-model="phone" placeholder="请输入手机号" maxlength="20">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
  .handle-record-modal{
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
    z-index: 100;
    width: 50%;
    height: 400px;
    background: #fff;
    border: 1px solid #e5e5e5;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
    padding: 20px;
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
    padding-top: 20px;
    height: 100%;
    text-align: center;
  }
  .input-row{
    margin: 5px 0px;
    display: flex;
    align-items: center;
    padding-left: 10%;
    height: 44px;
    .label{
      margin-right: 20px;
      width: 120px;
      text-align: right;
      color: #b3b3b3;
      font-size: 18px;
    }
    input{
      padding: 0px 10px;
      width: 220px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid #c0c4cc;
      font-size: 16px;
    }
  }
  .date-wrap{
    display: inline-block;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0rem 20px;
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
  .handle-record-modal.edit{
    .date-row{
      opacity: 0.6;
      pointer-events: none;
    }
  }
</style>

<script>
    import Vue from 'vue'

    export default {
        props: {
          options:{
            type:Object,
            default:()=>{
              return{
                type:'add',
                id:null,
                entry:null,
                ok:()=>{},
                cancel:()=>{}
              }
            }
          }
        },
        data:function () {
          return {
            name:null,//纪念日名称
            phone:null,//手机号
            date:null,//纪念日
            remindTime:null,//提醒时间
            remindMethod:'短信',//提醒方式，短信、电话
          }
        },
        methods:{
          close:function () {
            this.$el.remove();
            this.$destroy();
          },
          addAnniversary:function () {
            if(!this.name){
              this.operationFeedback({type:'warn',text:'请输入名称'});
              return;
            }
            if(!this.date){
              this.operationFeedback({type:'warn',text:'请选择纪念日日期'});
              return;
            }
            if(!this.remindTime){
              this.operationFeedback({type:'warn',text:'请选择提醒时间'});
              return;
            }
            if(!regex.phone.test(this.phone)){
              this.operationFeedback({type:'warn',text:regex.phoneAlert});
              return;
            }
            let params={
              ...Vue.tools.sessionInfo(),
              name:this.name,
              remindTime:Vue.tools.formatDate(this.remindTime,'yyyy-MM-dd hh:mm:ss'),
              remindWay:this.remindMethod,
              remindPhone:this.phone,
              dates:Vue.tools.formatDate(this.date,'yyyy-MM-dd')
            }
            let fb=this.operationFeedback({text:'保存中...'});
            Vue.api.addAnniversary(params).then((resp)=>{
              if(resp.respStatus=='success'){
                fb.setOptions({type:'complete',text:'添加成功'});
                this.options.ok&&this.options.ok();
                this.close();
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            });
          },
          update:function () {
            if(!this.name){
              this.operationFeedback({type:'warn',text:'请输入名称'});
              return;
            }
            if(!this.remindTime){
              this.operationFeedback({type:'warn',text:'请选择提醒时间'});
              return;
            }
            if(!regex.phone.test(this.phone)){
              this.operationFeedback({type:'warn',text:regex.phoneAlert});
              return;
            }
            let params={
              ...Vue.tools.sessionInfo(),
              id:this.options.entry.id,
            }
            let fb=this.operationFeedback({text:'保存中...'});
            if(this.name!=this.options.entry.name){
              params.name=this.name;
              Vue.api.updateAnniversaryName(params).then((resp)=>{
                if(resp.respStatus=='success'){

                }else{
                  fb.setOptions({type:'warn',text:resp.respMsg});
                }
              });
            }
            params.remindTime=Vue.tools.formatDate(this.remindTime,'yyyy-MM-dd hh:mm:ss');
            params.remindWay=this.remindMethod;
            params.remindPhone=this.phone;
            Vue.api.updateAnniversaryRemind(params).then((resp)=>{
              if(resp.respStatus=='success'){
                //
                this.options.entry.name=this.name;
                this.options.entry.remindTime=params.remindTime;
                this.options.entry.remindWay=this.remindMethod;
                this.options.entry.remindPhone=this.phone;
                //
                fb.setOptions({type:'complete',text:'保存成功'});
                this.options.ok&&this.options.ok();
                this.close();
              }else{
                fb.setOptions({type:'warn',text:resp.respMsg});
              }
            });

          },
          complete:function () {
            console.log('this.options.type:',this.options.type);
            if(this.options.type=='add'){
              this.addAnniversary();
            }else if(this.options.type=='edit'){
              this.update();
            }
          }
        },
        created: function () {

        },
        mounted:function () {
          /**
           *
           */
          if(this.options.type=='add'){//新增时刻

          }else if(this.options.type=='edit'){//编辑时刻
            if(this.options.entry){
              this.name=this.options.entry.name;
              this.date=this.options.entry.date;
              this.remindTime=this.options.entry.remindTime;
              this.remindMethod=this.options.entry.remindWay;
              this.phone=this.options.entry.remindPhone;
            }else{

            }
          }

        },
    }


</script>
