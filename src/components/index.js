/**
 * Created by Designer on 2018/1/23.
 */

import CmInput from './CmInput.vue';
import OperationFeedback from './OperationFeedback';
import Modal from './Modal';
import AlertModal from './AlertModal';
import ConfirmModal from './ConfirmModal';
import GenCode from './GenCode';

/*全局组件注册配置*/
export default {
  install:function(Vue){
    /*标签调度方式*/
    Vue.component('CmInput',CmInput);
    Vue.component('OperationFeedback',OperationFeedback);
    Vue.component('Modal',Modal);
    Vue.component('AlertModal',AlertModal);
    Vue.component('ConfirmModal',ConfirmModal);
    Vue.component('GenCode',GenCode);

    /*方法调度方式*/
    let OperationFeedbackConstructor = Vue.extend(OperationFeedback);
    let AlertModalConstructor=Vue.extend(AlertModal);
    let ConfrimModalConstructor=Vue.extend(ConfirmModal);
    const functionObject={
      /**
       * 操作提示
       * @param options object
       */
      operationFeedback:function (options) {
        options={...{
          parent:'app',//添加提示框的容器,该容器的position属性值须是'relative'
          parentPosition:'relative',//父元素属性值须是'relative'或者fixed
          tipsPosition:'fixed',//添加提示框的position属性值须是'absolute'或者fixed
          type:'operating',//提示类型，operating:正在处理,complete:处理完成,warn:错误警告,tips:提示
          text:'正在处理',//要提示的文本,
          delayForDelete:3000,//提示框消失延时,
          mask:false//是否显示蒙版
        },...options};
        //
        let parentEle=document.getElementById(options.parent);
        //
        let instance=new OperationFeedbackConstructor({
          data:{...options}
        });
        instance.$mount();
        parentEle.appendChild(instance.$el);
        //设置参数
        function setOptions(obj) {
          Object.assign(instance,obj);
        }
        return{
          setOptions:setOptions
        }
      },
      /**
       * toast提示
       * @param options object
       */
      toast:function (options) {
        options={...{
          type:'warn',//提示类型，warn:警告，complete:成功，clear:清除
          duration:3000,//延时多少毫秒元素消失
          text:null,//提示文本
        },...options}
        let iconClass=null;
        switch (options.type){
          case 'warn':
            iconClass='warn-icon';
            break;
          case 'complete':
            iconClass='complete-icon';
            break;
          case 'clear':
            iconClass='clear-icon';
            break;
        }
        Vue.$toast({
          message:options.text,
          iconClass:iconClass,
          duration:options.duration,
        });
      },
      /**
       * 操作提示器
       * @param options
       */
      indicator:function (options) {
        Vue.$indicator.open({
          spinnerType:'triple-bounce'
        });
      },
      /**
       * 操作反馈
       * @param options
       */
      handleFeedback:function (options) {
        options={...{
          type:'handling',//提示类型，handling:操作中，warn:警告，complete:成功，clear:清除
          duration:3000
        },...options};
        let setOptions=(obj)=>{
          Object.assign(options,obj);
          if(options.type=='handling'){
            Vue.$indicator.open({
              text: options.text,
            /*  spinnerType: 'fading-circle',*/
              duration:-1
            });
          }else{
            Vue.$indicator.close();
            if(options.duration!=0){
              Vue.toast(options);
            }
          }
        }
        setOptions(options);
        return{
          setOptions:setOptions
        }
      },
      /**
       * 提示弹窗
       * @param options
       */
      alert:function (options) {
        options={...{
          className: 'alert-modal', /*模态框的className*/
          title: '温馨提示',//提示标题
          html: '',   //提示内容
          yes: '确 定',
          ok:null,//回调
        },...options};
        //
        let parentEle=document.getElementById('app');
        //
        let instance=new AlertModalConstructor({});
        instance.options=options;
        instance.$mount();
        parentEle.appendChild(instance.$el);
      },
      /**
       * 确认弹窗
       * @param options
       */
      confirm:function (options) {
        options={...{
          className: 'alert-modal', /*模态框的className*/
          title: '温馨提示',//提示标题
          html: '',   //提示内容
          yes: '确 定',
          no: '取 消',
          ok:null,//回调
          cancel:null,//
        },...options};
        //
        let parentEle=document.getElementById('app');
        //
        let instance=new ConfrimModalConstructor({});
        instance.options=options;
        instance.$mount();
        parentEle.appendChild(instance.$el);
      }
    }
    /**/
    Object.assign(Vue,functionObject);
    Object.assign(Vue.prototype,functionObject);
  }
};
