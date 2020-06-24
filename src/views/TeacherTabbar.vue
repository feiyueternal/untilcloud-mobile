<template>
  <div id="app">
    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item
      icon="clock"
      to="/TeacherCourse">
        <span>课程管理</span>
      </van-tabbar-item>

      <van-tabbar-item
      to="/CreateCourse" 
      icon="fire">
        <span>创建课程</span>
      </van-tabbar-item>

      <van-tabbar-item
        to="/TeacherInfo"
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