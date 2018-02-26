import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Album from './pages/Album.vue'

Vue.use(Router)

const routes=[{
  path: '/',
  alias:'/home',
  name: 'home',
  component: Home
},{ path: 'album/:id?',
  name:'album',
  component: Album
},{
  path: '/login',
  name: 'login',
  component: Login
}]

export default new Router({
  routes:routes,
  mode: 'history',
  linkExactActiveClass:'active'
 /* scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }*/
})
