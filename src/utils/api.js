/**
 * Created by Designer on 2017/12/21.
 */
import axios from 'axios'

export default {
  install: function (Vue, options) {
    /*添加请求拦截器*/
    axios.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    /*添加响应拦截器*/
    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      return Promise.reject(error);
    });

    /**/
    Vue.api={
      //获取首页数据
      homePageData:function (params) {
        return axios({
          method: 'post',
          url: '/lyy/rest/group/distributor/homepageData',
          data: params
        });
      },
    }
  },

}
