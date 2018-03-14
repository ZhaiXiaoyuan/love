import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Album from './pages/Album.vue'
import AlbumDetail from './pages/AlbumDetail.vue'
import Time from './pages/Time.vue'

Vue.use(Router)

const routes=[{
  path: '/',
  alias:'/home',
  name: 'home',
  component: Home
},{
  path: '/album',
  name:'album',
  component: Album
},{
  path: '/album/:id',
  name:'album',
  component: AlbumDetail
},{
  path: '/login',
  name: 'login',
  component: Login
},{
  path: '/time',
  name:'time',
  component: Time
}]

export default new Router({
  routes:routes,
  mode: 'history',
  linkExactActiveClass:'active'
 /* scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }*/
})
