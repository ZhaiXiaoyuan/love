<!--登录后的页面容器-->
<template>
    <div class="container">
      <nav-bar></nav-bar>
      <router-view/>
      <div class="page-footer">
        ICP备&nbsp;&nbsp;5678910
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .container{
    width: 100%;
    height: 100%;
  }
</style>

<script>
    import Vue from 'vue'
    import NavBar from '../components/NavBar.vue'

    export default {
        components: {
          NavBar,
        },
        data: function () {
            return {

            }
        },
        computed: {},
        watch: {},
        methods: {

        },
        created: function () {
        /*  Vue.api.homePageData().then(function (resp) {

          });*/
        },
        mounted: function () {

        },
        route: {
           /* data: function(transition) {
                return Vue.utils.getCustomer().then(function (data) {
                    {
                        return {}
                    }
                });


            },
            waitForData: true,*/
        }

    };
</script>
