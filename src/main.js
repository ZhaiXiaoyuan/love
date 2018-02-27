// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueResource from 'vue-resource'
import vueCookie from 'vue-cookie'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import api from './utils/api'
import tools from './utils/tools'
import components from './components'

Vue.config.productionTip = false

/*---安装第三方插件---*/
Vue.use(vueResource);
Vue.use(vueCookie);
Vue.use(Mint);

/*---安装自定义插件---*/
Vue.use(api);
Vue.use(tools);
Vue.use(components);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
