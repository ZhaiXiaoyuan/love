/**
 * Created by Administrator on 2016/9/27 0027.
 */


/*一般的工具方法*/
import Vue from 'vue'
import router from '../router'
import App from '../App.vue'
import md5 from 'js-md5'

export default {
    install: function (Vue, options) {
        //常用正则
        window.regex={
          illegal :new RegExp("((?=[\x21-\x7e]+)[^A-Za-z0-9])"),
          illegalAlert:'请勿输入非法字符',
          pNum:/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,//正数
          pNumAlert:'请输入大于0的数值，限制2位小数',
          pInt:/^[1-9]*[1-9][0-9]*$/,//正整数
          pIntAlert:'请输入大于0的整数',
          nNum:/^(0|[1-9][0-9]*)$/,//自然数
          nNumAlert:'请输入大于等于0的整数',
          chn:/^[\u4e00-\u9fa5]{0,}$/,
          chnAlert:'请输入纯中文字符串',

          float:/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
          floatAlert:'数值格式有误，请输入小数点前不多于8位、小数点后不多于2位的数值！',

          percent:/^((100(\.00|\.0)?)|((\d|[1-9]\d)(\.\d{1,2})?))$/,
          percentAlert:'百分数格式错误，请输入0~100间数值，可保留两位小数！',

          contact:/^(0\d{2,3}-?\d{7,8})|(1\d{10})$/,
          contactAlert:'请输入正确格式的手机号码或电话号码！',

          phone:/^1\d{10}$/,
          phoneAlert:'请输入正确格式的手机号！',

          mail:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
          mailAlert:'请输入正确格式的邮箱！',

          idCard:/^[a-zA-Z0-9]{1,20}$/,
          idCardAlert:'身份证号码格式错误！',

          shortCode:/^(?![0-9]+$)[0-9A-Za-z]{7,20}$/,
          shortCodeAlert:'域名格式有误，请输入7到20位字母或数字，不可为纯数字！',

          pwd:/^[a-zA-Z0-9_]{6,20}$/,
          pwdAlert:'密码格式有误，请输入长度6~20，包含字母或数字的字符串！',
        }
        //
        Vue.tools = {
          /*生成请求时间戳*/
          genTimestamp:function () {
            return Math.ceil(new Date().getTime()/1000)
          },
          //获取domainId,
          getDomainId:function () {
            let session=Vue.cookie.get('session');
          },/**
           *
           * @param date
           * @param fmt
           * @returns {*}
           */
          formatDate:function(date,fmt){
            if(typeof date !=Date){
              date=new Date(date);
            }
            var o = {
              "M+": date.getMonth() + 1, //月份
              "d+": date.getDate(), //日
              "h+": date.getHours(), //小时
              "m+": date.getMinutes(), //分
              "s+": date.getSeconds(), //秒
              "q+": Math.floor((date.getMonth() + 3) / 3), //季度
              "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
              if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
          },
          sessionInfo:function () {
            let session=JSON.parse(JSON.parse(Vue.cookie.get('session')));
            var random = '';
            for(var i = 0; i < 6; i += 1){
              random += Math.floor(Math.random() * 10);
            }
            return{
              timeStamp:this.genTimestamp(),
              session:session.session,
           /*   key:session.key,*/
              random:random,
              domainId:session.session?session.session.substring(0,32):null,
              signature:md5.hex("session=" + session.session + "&random=" + random + "&timeStamp=" + this.genTimestamp() + "&token=" + session.key)
            }
          },
          /*获取文件上传鉴权*/
          getUploadKey:function (options) {
            let sessionInfo=this.sessionInfo();
            let bucket=null;
            let fileName=null;
            switch (options.type){
              case 'album':
                bucket='only.love.album.bucket';
                fileName=sessionInfo.domainId+'-album-'+sessionInfo.timeStamp+'.png';
            }
            let params={
              ...sessionInfo,
              bucket:bucket,
              file:fileName
            }

            return Vue.api.getUploadKey(params);
          },
          /*获取事件当前元素*/
          getCurEle:function (e) {
            var targetEle=null;
            if(e.currentTarget){
              targetEle=e.currentTarget;
            }else if(event.srcElement){
              targetEle=e.srcElement;
            }
            return targetEle;
          },
          /*阻止事件冒泡*/
          stopPropagation:function(e){
            console.log('e:',e);
            if(e){
              if(e.cancelBubble){
                e.cancelBubble = true;
              }
              else if(e.stopPropagation){
                e.stopPropagation();
              }
            }
          },
        }
    },
}
