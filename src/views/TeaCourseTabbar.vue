<template>
  <div id="app">
    <!-- <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item
      icon="manager"
      to="/CourseStu">
        <span>成员</span>
      </van-tabbar-item>

      <van-tabbar-item
      to="/TeaSign" 
      icon="fire">
        <span>签到</span>
      </van-tabbar-item>

      <van-tabbar-item
        to="/courseEdit"
        icon="setting">
        课程信息
      </van-tabbar-item>
    </van-tabbar>
   <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
    onClickLeft() {
      this.$router.push({ name: "TeacherCourse" });
      // history.back()
    }
  },
}
</script>
<style scoped>
</style>