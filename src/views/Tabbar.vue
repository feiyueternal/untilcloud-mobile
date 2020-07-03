<template>
  <div id="app">
    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item
      icon="clock"
      to="/Home">
        <span>课程表</span>
      </van-tabbar-item>

      <van-tabbar-item
      to="/scan" 
      icon="wap-nav">
        <span>扫一扫</span>
      </van-tabbar-item>

      <van-tabbar-item
        to="/Myinfo"
        icon="manager">
        我的
      </van-tabbar-item>
    </van-tabbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      active: 0,
    }
  },
  mounted(){
      
  },
  watch: {
    
  },
  methods: {
    
  },
}
</script>
<style scoped>
</style>