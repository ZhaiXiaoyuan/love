/**
 * 接口地址放在这里，存放在Vue的全局自定义方法
 * */
export default {
    install: function (Vue, options) {

        Vue.http.options.emulateJSON = true;
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
        let basicUrl='/love/';
        Vue.api = {
            /*登录*/
            loginByPhone: function (params) {
                return Vue.http.ajax({
                    method: 'post',
                    url: basicUrl + 'domain/loginByPhone',
                    params: params
                });
            },
        }
    },

}
