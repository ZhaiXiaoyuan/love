/**
 * 接口地址放在这里，存放在Vue的全局自定义方法
 * */
export default {
    install: function (Vue, options) {

      Vue.http.options.emulateJSON = true;
      Vue.http.interceptors.push((request, next)  =>{

        next((response) => {
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
        }
    },

}
