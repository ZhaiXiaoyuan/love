<template>
  <div class="cm-input" :class="{'cm-clear-input':clear=='true'||clear=='clear'}">
    <slot>
      <input ref="input" :type="type" :value="value" :placeholder="placeholder" :maxlength="maxlength" @input="updateValue($event)">
    </slot>
    <span class="clear-btn" @click="clearInput()" v-if="value&&value.length>0">&times;</span>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  input{
    height: 44px;
    width: 100%;
    padding: 0px 15px;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    border-radius: 0px;
  }
  .clear-btn{
    display: none;
    position: absolute;
    content: '';
    font-size: 18px;
    color: #fff;
    background: rgba(0,0,0,0.6);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top:0px;
    right: 10px;
    bottom: 0px;
    margin: auto;
    text-align: center;
  }
  .cm-clear-input{
    position: relative;
    input{
      padding-right: 40px !important;
    }
    .clear-btn{
     display: inline-block;
    }
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      type:{
        type:String,
        default:'text'
      },
      value:{},
      placeholder:String,
      maxlength:{},
      clear:String
    },
    data: function () {
      return {
      }
    },
    computed: {},
    watch: {
      value:function (newValue) {

      }
    },
    methods: {
      updateValue: function ($event) {
        // 通过 input 事件带出数值
        this.$emit('input', $event.target.value);
      },
      clearInput:function () {
        this.$emit('input', '');
      },
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
