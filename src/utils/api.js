/**
 * 接口地址放在这里，存放在Vue的全局自定义方法
 * */
import router from '../router'

export default {
    install: function (Vue, options) {

      Vue.http.options.emulateJSON = true;
      Vue.http.interceptors.push((request, next)  =>{
        next((response) => {
          if(response.body.respCode=='4001'){
            router.push({name:'login'});
          }
          return response
        });

      });
        /*自定义ajax函数，自带的不好用*/
        Vue.http.ajax = async function (options) {
            if(options.method.toUpperCase() == 'GET'){
                let res = await Vue.http.get(options.url, {params: options.params});
                if(typeof res.body == 'string'){
                    return JSON.parse(res.body);
                }else{
                    return res.body;
                }
            }else if(options.method.toUpperCase() == 'POST'){
                let res = await Vue.http.post(options.url, options.params);
                if(typeof res.body == 'string'){
                    return JSON.parse(res.body);
                }else{
                    return res.body;
                }
            }
        }
        let basicUrl='http://api.only.我爱你/iou/';
        //let basicUrl='http://chenwz.ngrok.xiaomiqiu.cn/iou/';//临时测试
        Vue.api = {
          /*登录*/
          loginByDomain: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'domain/login',
              params: params
            });
          },
          /*获取相册列表*/
          getAlbumList: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'album/queryAlbum',
              params: params
            });
          },
          /*新增相册*/
          addAlbum: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'album/addAlbum',
              params: params
            });
          },
          /*获取存储空间*/
          getRestSpace: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'fileSystem/getDomainStorage',
              params: params
            });
          },
          /*获取文件上传鉴权*/
          getUploadKey: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'fileSystem/getUploadKey',
              params: params
            });
          },
          /*向相册添加照片*/
          addPic: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'albumcnt/addAlbumcnt',
              params: params
            });
          },
          /*设置默认封面*/
          setDefCover: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'album/setDefCover',
              params: params
            });
          },
          /*设置封面*/
          setCover: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'album/setCover',
              params: params
            });
          },
          /*删除相册*/
          delAlbum: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'album/delAlbum',
              params: params
            });
          },
          /*修改相册名*/
          updAlbumName: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'album/updAlbumName',
              params: params
            });
          },
          /*获取相册详情*/
          getAlbumInfo: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'album/viewAlbum',
              params: params
            });
          },
          /*获取相册图片列表*/
          getPicList: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'albumcnt/queryAlbumcnt',
              params: params
            });
          },
          /*删除照片*/
          delPic: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'albumcnt/delAlbumcnt',
              params: params
            });
          },
          /*获取时刻列表*/
           getTimeList: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'moment/getMomentList',
              params: params
            });
          },
          /*获取等待时刻*/
          getWaitingTime: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'moment/getWaitMoment',
              params: params
            });
          },
          /*获取推荐时刻*/
          getPgcTime: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'moment/getPgcMoment',
              params: params
            });
          },
          /*添加等待时刻*/
          addWaitingTime: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'moment/addWaitMoment',
              params: params
            });
          },
          /*新建时刻*/
          newTime: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'moment/newMoment',
              params: params
            });
          },
          /*新建时刻*/
          getTime: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'moment/getMoment',
              params: params
            });
          },
          /*删除等待时刻*/
          delWaitingTime: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'moment/delWaitMoment',
              params: params
            });
          },
          /*删除时刻*/
          delTime: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'moment/delMoment',
              params: params
            });
          },
          /*编辑时刻*/
          editTime: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'moment/editMoment',
              params: params
            });
          },
          /*获取纪念日列表*/
          getAnniversaryList: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'anniversary/query',
              params: params
            });
          },
          /*新增纪念日*/
          addAnniversary: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'anniversary/add',
              params: params
            });
          },
          /*删除纪念日*/
          delAnniversary: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'anniversary/delete',
              params: params
            });
          },
          /*修改纪念日名称*/
          updateAnniversaryName: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'anniversary/updateName',
              params: params
            });
          },
          /*修改纪念日提醒时间*/
          updateAnniversaryRemind: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'anniversary/setRemind',
              params: params
            });
          },
          /*设置首页背景*/
          setIndexBg: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'domain/setIndexBgPic',
              params: params
            });
          },
          /*设置登录背景背景*/
          setLoginBg: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'domain/setLoginBgPic',
              params: params
            });
          },
          /*发送短信验证码*/
          sendVerfifyCode: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'sms/sendVerifySms',
              params: params
            });
          },
          /*验证短信验证码*/
          checkVerfifyCode: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'sms/verifySms',
              params: params
            });
          },
          /*获取域名信息*/
          getDomainInfo: function (params) {
            return Vue.http.ajax({
              method: 'post',
              url: basicUrl + 'domain/redirect',
              params: params
            });
          },
        }
    },

}
