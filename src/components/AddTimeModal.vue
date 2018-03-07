<!--添加时刻弹窗-->
<template>
  <div class="add-time-modal">
    <div class="mask"></div>
    <div class="modal-content">
      <div class="modal-body">
        <div class="new-time-panel">
          <div class="panel-header">
            <span class="return-btn"></span>
            <span class="title">新的时刻</span>
          </div>
          <div class="panel-body">

          </div>
        </div>
        <div class="time-queue-panel">
          <div class="panel-header">
            等待中
          </div>
          <div class="panel-body cm-scroll">
            <ul>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
              <li>去一趟斐济</li>
            </ul>
          </div>
          <div class="panel-footer">
            <i class="icon add-lg-icon cm-btn add-btn"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
  .add-time-modal{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
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
    right: 5%;
  }
  .modal-body{
    display: flex;
    height: 100%;
  }
  .new-time-panel{
    height: 100%;
    flex: 3;
    border: 1px solid red;
  }
  .new-time-panel{
    .panel-header{
      height: 20%;
      border: 1px solid red;
    }
    .panel-body{
      height: 80%;
      border: 1px solid blue;
    }
  }
  .time-queue-panel{
    margin-left: auto;
    flex: 1.8;
    height: 100%;
    background: #fff;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
    font-family: '宋体';
    position: relative;
    .panel-header{
      padding: 15px 0px;
      position: relative;
      font-size: 24px;
      color: #b2b2b2;
      text-align: center;
      &:after{
        position: absolute;
        content: '';
        width: 60%;
        height: 1px;
        background: #ccc;
        left: 0rem;
        right: 0rem;
        bottom: 0rem;
        margin: auto;
      }
    }
    .panel-body{
      padding: 20px;
      height:75%;
      overflow: auto;
      ul{
        li{
          display: flex;
          align-items: center;
          height: 40px;
          font-size: 18px;
          color: #b2b2b2;
          font-weight: bold;
        }
      }
    }
    .panel-footer{
      position: absolute;
      width: 100%;
      left: 0px;
      bottom: 0px;
      display: flex;
      height: 80px;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      color: #b2b2b2;
      &:before{
        position: absolute;
        content: '';
        width: 60%;
        height: 1px;
        background: #ccc;
        left: 0rem;
        right: 0rem;
        top: 0rem;
        margin: auto;
      }
    }
  }
  @media screen and(max-width: 1600px) {
    .modal-content{
      width: 70%;
      height: 640px;
    }
  }
</style>

<script>
    import Vue from 'vue'


    export default {
        props: {

        },
        data:function () {
          return {

          }
        },
        methods:{

        },
        created: function () {

        },
        mounted:function () {
        },
    }


</script>
